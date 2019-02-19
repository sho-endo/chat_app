class Friendship < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  validates :from_user_id, presence: true, uniqueness: { scope: :to_user_id }
  validates :to_user_id, presence: true
  validate :combination_of_user_id_must_be_unique, :cannot_make_friends_with_oneself

  def set_last_access(current_user_id)
    self.from_user_id == current_user_id ?
      self.update!(last_access_of_from_user: Time.now.strftime('%s%L').to_i) :
      self.update!(last_access_of_to_user: Time.now.strftime('%s%L').to_i)
  end

  def Friendship.find_friendship_by_ids(current_user_id, other_user_id)
    Friendship.find_by(from_user_id: current_user_id, to_user_id: other_user_id) ||
    Friendship.find_by(from_user_id: other_user_id, to_user_id: current_user_id)
  end

  private
    def combination_of_user_id_must_be_unique
      if Friendship.find_by(from_user_id: to_user_id, to_user_id: from_user_id)
        errors.add(:base, "すでに友達です")
      end
    end

    def cannot_make_friends_with_oneself
      if from_user_id == to_user_id
        errors.add(:base, "自分とはチャットできません")
      end
    end
end

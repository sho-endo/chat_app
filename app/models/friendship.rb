class Friendship < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  validates :from_user_id, presence: true, uniqueness: { scope: :to_user_id }
  validates :to_user_id, presence: true
  validate :combination_of_user_id_must_be_unique, :cannot_make_friends_with_oneself

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

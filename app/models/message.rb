class Message < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  validates :contents, presence: true
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
  validate :cannot_send_message_to_oneself

  private
    def cannot_send_message_to_oneself
      errors.add(:base, "自分にメッセージは送れません") if from_user_id == to_user_id
    end
end

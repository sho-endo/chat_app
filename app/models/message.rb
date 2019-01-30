class Message < ActiveRecord::Base
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  mount_uploader :picture, PictureUploader
  validates :from_user_id, presence: true
  validates :to_user_id, presence: true
  validate :cannot_send_message_to_oneself, :message_cannnot_be_nil, :picture_size

  private
    def cannot_send_message_to_oneself
      errors.add(:base, "自分にメッセージは送れません") if from_user_id == to_user_id
    end

    def message_cannnot_be_nil
      if contents.blank? && picture.blank?
        errors.add(:base, "空のメッセージは送信できません")
      end
    end

    def picture_size
      if picture.size > 5.megabytes
        errors.add(:picture, "5MB以上の画像はアップロードできません")
      end
    end
end

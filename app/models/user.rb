class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :name, presence: true, uniqueness: true
  has_many :friendships_of_from_user, class_name: 'Friendship', foreign_key: 'from_user_id', dependent: :destroy
  has_many :friendships_of_to_user, class_name: 'Friendship', foreign_key: 'to_user_id', dependent: :destroy
  has_many :friends_of_from_user, through: :friendships_of_from_user, source: :to_user
  has_many :friends_of_to_user, through: :friendships_of_to_user, source: :from_user
  has_many :send_messages, class_name: 'Message', foreign_key: 'from_user_id', dependent: :destroy
  has_many :receive_messages, class_name: 'Message', foreign_key: 'to_user_id', dependent: :destroy
  
  def friends
    friends_of_from_user + friends_of_to_user
  end

  def all_chats(other_user_id)
    send_messages.where(to_user_id: other_user_id) +
    receive_messages.where(from_user_id: other_user_id)
  end

  def User.serch_by_word(serch_word)
    serch_word.present? ? User.where('name LIKE ?', "%#{serch_word}") : []
  end
end

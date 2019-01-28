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
end

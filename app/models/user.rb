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
    friends = friends_of_from_user.to_a + friends_of_to_user.to_a
    return sort_by_time_of_last_message(friends)
  end

  def all_chats(other_user_id)
    send_messages.where(to_user_id: other_user_id) +
    receive_messages.where(from_user_id: other_user_id)
  end

  def get_post_time_of_last_message(other_user)
    messages = self.all_chats(other_user.id)
    return 10000000000000 if messages.empty? # メッセージがない場合はリストの１番上に持ってくるため
    time_of_last_message = messages.sort_by!{ |message| message.timestamp }[-1].timestamp
    return time_of_last_message
  end

  def sort_by_time_of_last_message(friends)
    friends.sort_by!{ |friend| self.get_post_time_of_last_message(friend) }.reverse!
  end

  def User.serch_by_word(serch_word)
    serch_word.present? ? User.where('name LIKE ?', "%#{serch_word}%") : []
  end
end

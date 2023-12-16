class User < ApplicationRecord
  has_secure_password

  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  
  before_validation :ensure_session_token

  has_many :cart_items,
    foreign_key: :user_id,
    class_name: :CartItem,
    dependent: :destroy

  has_many :items_in_cart,
    through: :cart_items,
    source: :item

  has_many :reviews,
    foreign_key: :user_id,
    class_name: :Review,
    dependent: :destroy
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user&.authenticate(password)
      return user
    else 
      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end

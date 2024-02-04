class Customer < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :omniauthable, :recoverable, :rememberable
  devise :database_authenticatable, :registerable, :validatable

  has_many :addresses
  has_many :orders

  validates_presence_of :email, :encrypted_password
  validates_uniqueness_of :email

  before_create :assign_unique_jti

  def as_json(options = {})
    super({ except: [:jti] }.merge(options))
  end

  def assign_unique_jti
    self.jti = self.class.generate_unique_uuid
  end

  def self.generate_unique_uuid
    uuid = SecureRandom.uuid
    loop do
      if Customer.where(jti: uuid).count.zero?
        break uuid
      end

      uuid = SecureRandom.uuid
    end
  end
end

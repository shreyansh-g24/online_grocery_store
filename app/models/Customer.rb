class Customer < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable, :omniauthable, :recoverable, :rememberable, :validatable
  devise :database_authenticatable, :registerable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  validates_presence_of :email, :encrypted_password
  validates_uniqueness_of :email

  def as_json(options)
    super({ except: [:jti] }.merge(options))
  end
end

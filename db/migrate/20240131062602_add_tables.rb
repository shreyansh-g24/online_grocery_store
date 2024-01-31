class AddTables < ActiveRecord::Migration[7.1]
  def change
    enable_extension 'pgcrypto'

    create_table :customers, id: :uuid do |t|
      t.string :email, index: { unique: true }, null: false
      t.string :name

      t.timestamps
    end

    create_table :addresses, id: :uuid do |t|
      t.belongs_to :customer, null: false, index: true, foreign_key: true, type: :uuid
      t.text :full_address, null: false
      t.string :contact, null: :false

      t.timestamps
    end

    create_table :orders, id: :uuid do |t|
      t.belongs_to :address, null: false, index: true, foreign_key: true, type: :uuid
      t.string :status, null: false, default: "in_cart"

      t.timestamps
    end

    create_table :groceries, id: :uuid do |t|
      t.string :name, null: false
      t.integer :price_per_unit, default: 0, null: false
      t.string :unit
      t.boolean :is_out_of_stock, default: false

      t.timestamps
    end

    create_table :groceries_orders, id: :uuid do |t|
      t.integer :quantity, null: false, default: 0
      t.belongs_to :order, foreign_key: true, type: :uuid, index: true, null: false
      t.belongs_to :grocery, foreign_key: true, type: :uuid, index: true, null: false

      t.timestamps
    end
  end
end

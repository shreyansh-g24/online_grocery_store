class Api::V1::Admin::GroceriesController < Api::V1::Admin::BaseController
  def create
    grocery = Grocery.new(grocery_params)
    if grocery.save
      respond_with_json({ message: "Grocery created successfully", grocery: grocery }, :ok)
    else
      respond_with_json({ errors: [grocery.errors.full_messages] }, :ok)
    end
  end

  def update
    grocery = Grocery.find_by(id: params[:id])
    if grocery.present? && grocery.update(grocery_params)
      respond_with_json({ message: "Grocery updated successfully", grocery: grocery }, :ok)
    elsif grocery.present?
      respond_with_json({ errors: grocery.errors.full_messages }, :unprocessable_entity)
    else
      respond_with_json({ errors: ["Grocery not found"] }, :not_found)
    end
  end

  private

  def grocery_params
    params.require(:grocery).permit(:name, :price_per_unit, :unit, :is_out_of_stock)
  end
end

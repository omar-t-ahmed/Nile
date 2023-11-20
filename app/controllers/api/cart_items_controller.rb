class Api::CartItemsController < ApplicationController
    wrap_parameters include: CartItem.attribute_names + ['userId', 'itemId']

    def create
        @cart_item = CartItem.find_by(user_id: params[:user_id], item_id: params[:item_id])
    
        if @cart_item
            @cart_item.quantity += cart_params[:quantity].to_i
        else
            @cart_item = CartItem.new(cart_params)
        end

        if @cart_item.save!
            render json: @cart_item, status: :ok
        else
            render json: { errors: @cart_item.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @cart_item = CartItem.find_by(user_id: params[:user_id], item_id: params[:item_id])

        if @cart_item
            render :show
        else
            render json: { error: 'Cart item not found' }, status: :not_found
        end
    end

    def index
        # debugger
        @cart_items = current_user.cart_items
        render :index
    end

    def destroy
        @cart_item = CartItem.find(params[:id])

        @cart_item.destroy
    end

    def delete_multiple
        # @cart_items = CartItem.where(id: params[:cartItemIds])
        # @cart_items.destroy_all

        @cart_items = CartItem.where(id: params["_json"])
        @cart_items.destroy_all
    end

    private

    def cart_params 
        params.require(:cart_item).permit(:user_id, :item_id, :quantity)
    end
end



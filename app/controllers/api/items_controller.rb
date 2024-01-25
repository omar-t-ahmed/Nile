class Api::ItemsController < ApplicationController 

    def index
        @items = Item.all
        render :index
    end

    def show
        @item = Item.find_by(id: params[:id])
        render :show
    end
    
    def search
        @items = Item.where("name ILIKE ?", "%#{params[:search]}%")
        render :index
    end

    def category
        @items = Item.where("category ILIKE ?", "%#{params[:search]}%")
        render :index
    end
end
class Api::ReviewsController < ApplicationController

    def create
        @review = Review.new(review_params)
    
        if @review.save
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        @review = Review.find_by(id: params[:id])

        if @review.update(review_params)
            render :show
        end
    end

    def show
        @review = Review.find_by(id: params[:id])
        render :show
    end

    def index
        @reviews = Review.all
        render :index
    end

    def destroy
        @review = Review.find(params[:id])

        @review.destroy
    end

    private

    def review_params
        params.require(:review).permit(:star_rating, :header, :body, :user_id, :item_id)
    end
end

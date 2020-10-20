class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  # def new
  # end

  def create
    # Postモデルへcontentを保存、checkedの値の初期値はfalse(偽)とし、そのデータをpostという変数に代入
    post = Post.create(content: params[:content], checked: false)
    # JSON形式でメモデータをJSに返す
    render json:{ post: post }
    # Post.create(content: params[:content])
    # redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked 
      post.update(checked: false)
    else
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
    render :new
  end
end

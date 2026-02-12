class TasksController < ApplicationController
  def index
    @tasks = Task.all.order(created_at: :desc)
    render json: @tasks
  end

  # Permet de créer une tâche depuis l'API plus tard
  def create
    @task = Task.create(task_params)
    render json: @task
  end

  private

  def task_params
    params.require(:task).permit(:title, :status, :priority, :assigned_to, :due_date)
  end
end
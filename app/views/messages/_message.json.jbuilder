json.(message, :created_at, :updated_at, :title, :content, :id)
json.comments(message.comments) do |comment|
  json.extract! comment, :id, :content
  json.user do
    json.extract! comment.user, :id, :name
  end
end

class MessageRelayJob < ApplicationJob
  def perform(message)
    ActionCable.server.broadcast "messages:#{message.id}:comments",
                                 comment: MessagesController.render(partial: 'messages/message', locals: {message: message})
  end
end

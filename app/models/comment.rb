class Comment < ActiveRecord::Base
  belongs_to :message
  belongs_to :user

  after_commit { MessageRelayJob.perform_later(self.message) }
end

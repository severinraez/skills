class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  private

  def start_at_before_finish_at
    return if finish_at.nil? || start_at.nil?
    errors.add(:start_at, 'muss vor "Datum bis" sein') if start_at > finish_at
  end
end

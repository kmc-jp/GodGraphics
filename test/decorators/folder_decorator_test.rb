require 'test_helper'

class FolderDecoratorTest < ActiveSupport::TestCase
  def setup
    @folder = Folder.new.extend FolderDecorator
  end

  # test "the truth" do
  #   assert true
  # end
end

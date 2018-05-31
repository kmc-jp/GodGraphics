require 'test_helper'

class GraphicDecoratorTest < ActiveSupport::TestCase
  def setup
    @graphic = Graphic.new.extend GraphicDecorator
  end

  # test "the truth" do
  #   assert true
  # end
end

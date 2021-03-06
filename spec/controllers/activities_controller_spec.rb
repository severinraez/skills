require 'rails_helper'

describe ActivitiesController do
  before { auth(:ken) }

  describe 'GET index' do
    it 'returns all activities' do
      keys = %w(description updated_by role finish_at)

      process :index, method: :get, params: { person_id: bob.id }

      activities = json['data']

      expect(activities.count).to eq(1)
      expect(activities.first['attributes'].count).to eq(5)
      json_object_includes_keys(activities.first['attributes'], keys)
    end
  end

  describe 'GET show' do
    it 'returns activity' do
      activity = activities(:swisscom)

      process :show, method: :get, params: { person_id: bob.id, id: activity.id }

      activity_attrs = json['data']['attributes']

      expect(activity_attrs['description']).to eq(activity.description)
    end
  end

  describe 'POST create' do
    it 'creates new activity' do
      activity = { description: 'test description',
                   updated_by: 'Bob',
                   finish_at: '2013-03-02',
                   start_at: '2010-10-20',
                   role: 'test role' }

      post :create, params: create_params(activity, bob.id, 'activity')

      new_activity = Activity.find_by(description: 'test description')
      expect(new_activity).not_to eq(nil)
      expect(new_activity.finish_at.to_s).to eq('2013-03-02')
      expect(new_activity.start_at.to_s).to eq('2010-10-20')
    end
  end

  describe 'PUT update' do
    it 'updates existing person' do
      activity = activities(:swisscom)
      updated_attributes = { description: 'changed' }

      process :update, method: :put, params: update_params(activity.id,
                                                           updated_attributes,
                                                           bob.id, 'activity')
      activity.reload
      expect(activity.description).to eq('changed')
    end
  end

  describe 'DELETE destroy' do
    it 'destroys existing person' do
      activity = activities(:swisscom)
      process :destroy, method: :delete, params: {
        person_id: bob.id, id: activity.id
      }

      expect(Activity.exists?(activity.id)).to eq(false)
    end
  end

  private

  def bob
    @bob ||= people(:bob)
  end

  def create_params(object, user_id, model_type)
    { data: { attributes: object,
              relationships: { person: { data: { id: user_id } } }, type: model_type } }
  end

  def update_params(object_id, updated_attributes, user_id, model_type)
    { data: { id: object_id,
              attributes: updated_attributes,
              relationships: {
                person: { data: { id: user_id } }
              }, type: model_type }, id: object_id }
  end
end

require 'rails_helper'

describe Odt::Cv do
  fixtures :people

  context 'export' do
    it 'can export without an image' do
      person = people(:bob)
      person.remove_picture
      expect(person.picture.file).to be_nil
      Odt::Cv.new(person).export
    end

    it 'can export without competences' do
      person = people(:bob)
      person.competences = nil
      Odt::Cv.new(person).export
    end
  end

  context 'fomatting' do
    it 'returns no month if day is 13' do
      formatted_month = Odt::Cv.new(nil).send(:formatted_month, Date.new(2000, 2, 13))

      expect(formatted_month).to eq('')
    end

    it 'translates nationalities' do
      nationalities = Odt::Cv.new(people(:bob)).send(:nationalities)
      expect(nationalities).to eq('Schweiz, Schweden')

      nationalities = Odt::Cv.new(people(:alice)).send(:nationalities)
      expect(nationalities).to eq('Australien')
    end

  end
end

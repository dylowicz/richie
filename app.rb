require 'sinatra/base'
require 'pry'
require 'json'
require_relative 'mpd_manager'

module Richie
  def load_music

  end

  class App < Sinatra::Base
    configure do
      set :mpd, MPD.new
      set :public_folder, 'public/'
    end

    get '/?' do
      settings.mpd.connect if not settings.mpd.connected?
      settings.mpd.random = false if settings.mpd.random?
      settings.mpd.repeat = false if settings.mpd.repeat?
      settings.mpd.songs.each { |song| settings.mpd.add(song) }
      File.read('public/index.html')
    end

    get '/list' do
      content_type :json
      { :key1 => 'value1', :key2 => 'value2' }.to_json
    end

    post '/add' do
      # TODO
    end

    get '/clear_queue' do
      # TODO
    end

    post '/playback' do
      p eval(request.body.string)[:track]
      settings.mpd.playing? ? settings.mpd.pause = true : settings.mpd.play
      @params = "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
    end

    get '/next' do
      if settings.mpd.stopped?
        settings.mpd.play
        settings.mpd.next
        settings.mpd.stop
      elsif settings.mpd.playing?
        settings.mpd.next
      end

      @params = "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
    end

    get '/previous' do
      if settings.mpd.stopped?
        settings.mpd.play
        settings.mpd.previous
        settings.mpd.stop
      elsif settings.mpd.playing?
        settings.mpd.previous
      end

      @params = "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
    end

    get '/shuffle' do
      @params = settings.mpd.random? ? settings.mpd.random = false : settings.mpd.random = true
    end

    get '/repeat' do
      @params = settings.mpd.repeat? ? settings.mpd.repeat = false : settings.mpd.repeat = true
    end

    run! if app_file == $0
  end
end

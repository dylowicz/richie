require 'sinatra/base'
require 'ruby-mpd'
require 'pry'
require 'json'

module Richie
  class App < Sinatra::Base
    configure do
      set :mpd, MPD.new
      set :public_folder, 'public/'
    end

    get '/?' do
      settings.mpd.connect if not settings.mpd.connected?
      settings.mpd.random = false if settings.mpd.random?
      settings.mpd.repeat = false if settings.mpd.repeat?
      settings.mpd.clear
      settings.mpd.songs.each { |song| settings.mpd.add(song) }
      File.read("#{settings.public_folder}/index.html")
    end

    get '/list' do
      content_type :json

      current_song = settings.mpd.current_song.nil? ? "" : "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
      music_list = { artists: [], currentSong: current_song}
      for artist in settings.mpd.artists
        artist_h = { name: artist, albums: [] }
        for album in settings.mpd.albums(artist)
          album_h = { name: album, songs: [] }
          for song in settings.mpd.where(artist: artist, album: album)
            album_h[:songs].push(song.to_h)
          end
          artist_h[:albums].push(album_h)
        end
        music_list[:artists].push(artist_h)
      end

      music_list.to_json
    end

    post '/add' do
      # TODO
    end

    get '/clear_queue' do
      settings.mpd.clear
    end

    post '/play_song' do
      song = eval(request.body.string)[:song]
      settings.mpd.clear
      settings.mpd.add(settings.mpd.where(file: song).first.file)
      settings.mpd.play
    end

    post '/play_album' do
      album = eval(request.body.string)[:album]
      settings.mpd.clear
      settings.mpd.where(album: album).each {|song| settings.mpd.add(song.file)}
      settings.mpd.play
    end

    post '/play_artist' do
      artist = eval(request.body.string)[:artist]
      settings.mpd.clear
      settings.mpd.where(artist: artist).each {|song| settings.mpd.add(song.file)}
      settings.mpd.play
    end

    get '/playback' do
      settings.mpd.playing? ? settings.mpd.pause = true : settings.mpd.play

      current_song = settings.mpd.current_song.nil? ? "" : "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
      @params = current_song
    end

    get '/next' do
      if settings.mpd.stopped?
        settings.mpd.play
        settings.mpd.next
        settings.mpd.stop
      elsif settings.mpd.playing?
        settings.mpd.next
      end

      current_song = settings.mpd.current_song.nil? ? "" : "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
      @params = current_song
    end

    get '/previous' do
      if settings.mpd.stopped?
        settings.mpd.play
        settings.mpd.previous
        settings.mpd.stop
      elsif settings.mpd.playing?
        settings.mpd.previous
      end

      current_song = settings.mpd.current_song.nil? ? "" : "#{settings.mpd.current_song.artist} - #{settings.mpd.current_song.title}"
      @params = current_song
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

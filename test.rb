require 'pry'
require 'ruby-mpd'

mpd = MPD.new
mpd.connect
binding.pry

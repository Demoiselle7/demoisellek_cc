
// 播放
var play = function() {
	// 播放状态
	var playStatus = true
	// 唱臂
	var arm = e('#id-arm')
	var armMove = 'translateX(-50%) rotateZ(-8deg)'
	var music = e('#id-audio-player')
	// 延时
	var delay = 500

	var playBtn = e('#id-img-play')
	playBtn.src = '../../static/img/music_player/pause.png'
	if(music.playTimeout == undefined) {
		music.playTimeout = null
	}
	arm.style.transform = armMove
	setTimeout(rotateCD, delay)
	music.playTimeout = setTimeout(playMusic, delay)
	bindEventPlayProgress()
	showTime()
}

// 暂停
var pause = function() {
	playStatus = false
	var cd = e('#id-rotate-cd')
	clearInterval(cd.interval)
	var arm = e('#id-arm')
	var armMove = 'translateX(-50%) rotateZ(-40deg)'
	arm.style.transform = armMove
	var playBtn = e('#id-img-play')
	playBtn.src = '../../static/img/music_player/play.png'
	pauseMusic()
}

// 播放音乐
var playMusic = function() {
	var music = e('#id-audio-player')
	music.play()
}

// 暂停音乐
var pauseMusic = function() {
	var music = e('#id-audio-player')
	music.pause()
}

// 旋转 CD
var rotateCD = function() {
	var cd = e('#id-rotate-cd')
	if(cd.interval == undefined) {
		cd.interval = null
	}
	if(cd.dregree == undefined) {
		cd.dregree = 0
	}
	clearInterval(cd.interval)
	cd.interval = setInterval(function() {
		cd.dregree = (cd.dregree + 0.25) % 360
		var style = `translateX(-50%) translateY(-50%) rotateZ(${cd.dregree}deg)`
		cd.style.transform = style
	}, 20)
}

// 重置 CD 的转动角度
var resetCD = function() {
	var cd = e('#id-rotate-cd')
	var style = `translateX(-50%) translateY(-50%) rotateZ(0deg)`
	cd.dregree = 0
	cd.style.transform = style
}

// 播放 时间显示
var showTime = function() {
	var music = e('#id-audio-player')
	var currentTimeSpan = e('#id-current-time')
	var durationSpan = e('#id-duration')
	music.show = null
	clearInterval(music.show)
	music.show = setInterval(function() {
		var duration = music.duration
		var currentTime = music.currentTime
		if(duration != '' && currentTime != '') {
			currentTimeSpan.innerHTML = time(currentTime)
			durationSpan.innerHTML = time(duration)
		}
		showProgress()
	}, 100)
}

// 绑定 改变进度
var bindEventPlayProgress = function() {
	var pointer = e('#id-music-progress-point')
	bindEventProgress(pointer, changeProgress, endChangeProgress)
}

// 停止进度条的改变
var endChangeProgress = function() {
	var music = e('#id-audio-player')
	if(music.changeProgress == true) {
		music.currentTime = music.current
	}
	music.changeProgress = false
}

var showProgress = function() {
	var music = e('#id-audio-player')
	var duration = music.duration
	var currentTime = music.currentTime
	var len = currentTime / duration * 100
	if(music.changeProgress == undefined) {
		music.changeProgress = false
	}
	if(music.changeProgress == false) {
		setProgress(len)
	}
}

var changeProgress = function() {
	var music = e('#id-audio-player')
	music.changeProgress = true
	music.current = 0
	var progressSection = e('#id-progress')
	var duration = e('#id-duration')
	var d = event.clientX - progressSection.offsetLeft
	var width = duration.offsetLeft - progressSection.offsetLeft
	if(d <= 0) {
		d = 0
	}
	if(d >= width) {
		d = width - 1
	}
	var len = Math.floor(d * 100 / width)
	var duration = music.duration
	var currentTime = music.currentTime
	music.current = duration * len / 100
	setProgress(len)
}

var setProgress = function(len) {
	var progressSection = e('#id-progress')
	var duration = e('#id-duration')
	var width = duration.offsetLeft - progressSection.offsetLeft
	var pointer = e('#id-music-progress-point')
	var px = len * width / 100
	pointer.style.left = px +'px'
	var currentProgress = e('#id-current-progress')
	currentProgress.style.width = len + '%'
}

// 计算时间
var time = function(t) {
	var sec = Math.floor(t % 60)
	var min = Math.floor(t / 60)
	if(sec < 10) {
		sec = '0' + sec
	}
	if(min < 10) {
		min = '0' + min
	}
	return `${min}:${sec}`
}

// 暂停/播放按钮的图片切换
var bindEventPlay = function() {
	var pre = e('#id-img-pre')
	var next = e('#id-img-next')
	var playBtn = e('#id-img-play')
	bindEvent(playBtn, 'click', function() {
		if(playStatus == false) {
			playStatus = true
			play()
		} else {
			playStatus = false
			pause()
		}
	})
}

// 绑定 进度条函数
var bindEventProgress = function(pointer, classback, endCallback) {
	var body = e('body')
 	pointer.move = false
	bindEvent(pointer, 'mousedown', function() {
		pointer.move = true
	})
	bindEvent(body, 'mousemove', function(e) {
		if(pointer.move == true) {
			classback(e)
		}
	})
	bindEvent(body, 'mouseup', function() {
		pointer.move = false
		if(endCallback != undefined) {
			endCallback()
		}
	})
	bindEvent(body, 'mouseleave', function() {
		pointer.move = false
		if(endCallback != undefined) {
			endCallback()
		}
	})
}

// 绑定音量按钮
var bindEventVol = function() {
	var pointer = e('#id-music-vol-point')
	bindEventProgress(pointer, changeVol)
}

// 调节音量
var changeVol = function(event) {
	var volSection = e('#id-music-vol-order')
	var d = event.clientX - volSection.offsetLeft
	if(d <= 100) {
		d = 100
	}
	if(d >= 200) {
		d = 200
	}
	// 改变圆点 及 进度条
	var volWidth = d - 100
	var volume = volWidth / 100
	var pointer = e('#id-music-vol-point')
	pointer.style.left = d +'px'
	var vol = e('#id-music-vol')
	vol.style.width = volWidth + 'px'
	// 改变音量
	var music = e('#id-audio-player')
	music.volume = volume
}

// 音乐播放器初始化
var musicInit = function() {
	var music = e('#id-audio-player')
    // 先初始化音量为0.7
	music.volume = 0.7
	UpdateMusicList()
	bindEventSelectMusic()
	if(musicList.length >= 1) {
		var m = musicList[0]
		updateMusic(m)
	}
	bindEventToggleMusic()
	bindEventMusicEnd()
}

// 更新播放列表
var UpdateMusicList = function() {
	var list = e('#id-music-play-list ')
	var musics = findAll(list, '.music-info')
	for(var j = 0; j < musics.length; j++) {
		musics[j].remove()
	}
	for(var i = 0; i < musicList.length; i++) {
		insertMusic(musicList[i], i)
	}
	bindEventSelectMusic()
}

// 插入音乐
var insertMusic = function(music, i) {
	var musicName = music.name
	var singer = music.singer
	var duration = music.duration
	var html = `<div class=music-info data-num=${i }>
		<span class=music-name>${musicName}</span>
		<span class=music-duration>${duration}</span>
		<span class=music-singer>${singer}</span>
	</div>`
	var list = e('#id-music-play-list')
 	appendHtml(list, html)
}

// 更新当前音乐
var updateMusic = function(music) {
    log('muuuuuuusic',music)
	var player = e('#id-audio-player')
	var baseAD = '../../static/src/'
	player.src = baseAD + music.music
	upatePlayingSymbol()
	var cover = e('#id-cd-cover')
	var basePath = '../../static/img/music_player/'
	var path = basePath + music.imgPath
	cover.style.backgroundImage = `url(${path})`
}

// 更新正在播放标志
var upatePlayingSymbol = function() {
	removeClassAll('playing')
	var list = e('#id-music-play-list')
	var cur = parseInt(list.dataset.cur)
	var musics = findAll(list, '.music-info')
	musics[cur].classList.add('playing')
}

// 绑定 选择播放列表
var bindEventSelectMusic = function() {
	bindAll('.music-info', 'click', function(event) {
		var list = e('#id-music-play-list')
		var cur = parseInt(list.dataset.cur)
		var num = parseInt(this.dataset.num)
		list.dataset.cur = num
		CutPlay(musicList[num], num)
	})
}

// 绑定 切换歌曲 按钮
var bindEventToggleMusic = function() {
	var next = e('#id-img-next')
	var pre = e('#id-img-pre')
	bindEvent(next, 'click', nextMusic)
	bindEvent(pre, 'click', preMusic)
}

// 顺序播放下一首
var nextMusic = function() {
    resetCD()
	var list = e('#id-music-play-list')
	var cur = parseInt(list.dataset.cur)
	var len = musicList.length
	var nextIndex = (cur + 1) % len
	list.dataset.cur = nextIndex
	updateMusic(musicList[nextIndex])
	pause()
	setTimeout(play, 500)
}
// 其他播放方式待进一步完善

// 切歌并播放
var CutPlay = function(music, n) {
	updateMusic(music)
	upateCurrentMusic(n)
	resetCD()
	pause()
	setTimeout(play, 500)
}

// 更新当前歌曲
var upateCurrentMusic = function(n) {
	var list = e('#id-music-play-list')
	list.dataset.cur = n
	upatePlayingSymbol()
}

// 上一首
var preMusic = function() {
	resetCD()
	var list = e('#id-music-play-list')
	var cur = parseInt(list.dataset.cur)
	var len = musicList.length
	var preIndex = (len +　cur - 1) % len
	list.dataset.cur = preIndex
	updateMusic(musicList[preIndex])
	pause()
	setTimeout(play, 500)
}

// 音乐结束
var bindEventMusicEnd = function() {
	var player = e('#id-audio-player')
	bindEvent(player, 'ended', function() {
		pause()
		setTimeout(autoPlayNext, 500)
	})
}

// 自动播放下一首
var autoPlayNext = function() {
	resetCD()
	nextMusic()
}



// 主函数
var __main = function() {
	playStatus = false
	musicInit()
	bindEventPlay()
	bindEventVol()
	bindEventPlayProgress()
}

__main()

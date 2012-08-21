function init() {

	var readTweetColor = '#F0F0F0';
	
	$(document).ready(function() {
		var contentMain = $(".content-main");
	
		$(document).on('mousedown', function(e) {
			// If click is registered on the new tweets bar element then do some work.
			if ($(e.target).hasClass("new-tweets-bar")) {
				var tweetsToMark = $("[data-item-type=tweet]");
				setTweetsToRead(tweetsToMark);
				window.setTimeout(scrollToNewestTweet, 500);
			}
		});

		function setTweetsToRead(tweets) {
			$(tweets).each(function() {
				$(this).css('background-color', readTweetColor);
				$(this).attr("data-read-tweet", "true");
			});
		}
		
		function scrollToNewestTweet() {
			var readTweets = $("[data-read-tweet]");
			var newestTweet = readTweets.first().prev();

			var windowHeight = $(window).attr("innerHeight");
			log("windowHeight: " + windowHeight);
			
			var top = 0;
			
			if (!isNullOrUndefined(newestTweet)) {
				top = newestTweet.offset().top;
				log("top: " + top);
			}				
			
			var newestTweetOffset = top - (windowHeight - 150);
			log("newestTweetOffset: " + newestTweetOffset);
			
			if ((newestTweetOffset - 100) > 0) {
				$('body').animate({
					scrollTop: newestTweetOffset
				}, 'slow');
				log("window was scrolled.");
			}
		}
		
		function isNullOrUndefined(item) {
			if (item == null || item == undefined) {
				log("newestTweet was null or undefined.");
				return true;
			}
			return false;
		}
		window.onerror = function(errorMsg, url, lineNumber) {
			log("Unhandled exception caught. \nMessage: " + errorMsg.toString());
			return true;
		};
		
	});
	
	function log(msg) {
		console.log(msg);
	}
}

window.setTimeout(init, 3000);
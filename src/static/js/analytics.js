/*
 Contents
 --------
 1. Utililty functions
 2. Exit Links
 3. Tracked Links
 4. File Downloads
 5. Social Tracking
 6. Newsletter Signup Form
 7. Data tracking
 8. Find and Track YouTube Videos

An analytics file to fire custom events based on on Google's ga.js:
https://developers.google.com/analytics/devguides/collection/gajs/

*/

// Add in Google Analytics tracking check wrapper
var track = function(category, name, value) {
    'use strict';
    if (window._gaq) {
        window._gaq.push(['_trackEvent', category, name, value]);
    }
}; // End Google Analytics tracking check

 // 1. Utililty functions
 // Check if URL is internal.
 $(function() {
    'use strict';
    function isInternalHref( href ) {
        if (href.indexOf('https:') == -1 && href.indexOf('http:') == -1 && href.indexOf('//') !== 0) { // There's no protocol, so it's internal
            return true;
    }
    else { // There is a protocol, so we check for our domain.
            if (href.indexOf('consumerfinance.gov') !== -1) { // It contains our domain, so it's internal.
                return true;
            }
            else { // There is a protocol and not our domain, so it's external.
                return false;
            }
        }
    }

    // Now, track stuff like this: track(category, name, value);

    $(document).ready(function() {
        // Just for testing purposes
        // var a = 'http://www.consumerfinance.gov';
        // var b = 'http://davidakennedy.com';
        // var c = '/about';

        // var testInternal = isInternalHref(a);
        // console.log(testInternal); // Prints true.

        // var testExit = isInternalHref(b);
        // console.log(testExit); // Prints false.

        // var testNoProt = isInternalHref(c);
        // console.log(testNoProt); // Prints true.
        // End testing

        $( 'a' ).not('.exit-link, .internal-link').each(function() { // In case our links already have the class; don't include.
            var href = $(this).attr('href');
            if ( !href ) {
                return;
            }
            if ( isInternalHref( href ) ) { // Internal links get a class; not tracked in Analytics.
                $(this).addClass('internal-link');
            }
            else { // Exit links get a class; this is tracked with Analytics.
                $(this).addClass('exit-link');
            }
        });

        // 2. Exit Links
        $('a.exit-link').on('click', function(e) {
            var linkDelay = 500;
            var link_text = $(this).text();
            var link_url = $(this).attr('href');
            var isCtrlPressed = e.ctrlKey || e.metaKey;
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('exit link', link_text, link_url); }
            catch( error ) {}

            if ( !$(this).hasClass('dont-redirect') ) {
                // Give google analytics time to do its thing before changing the page url
                // http://support.google.com/analytics/answer/1136920?hl=en
                setTimeout(function() {
                    if (isCtrlPressed) {
                        window.open(link_url, '_blank');
                    } else {
                        document.location.href = link_url;
                    }
                }, linkDelay);
            }
        });

        // 3. Tracked Links
        $('a.tracked-link').on('click', function(e) {
            var linkDelay = 500;
            var link_text = $(this).text();
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('internal links', link_text, link_url); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        // 4. File Downloads
        // a[href$="pdf#page=315"] is special to CFPB Exam Manual
        $('a[href$="zip"],a[href$="pdf"],a[href$="pdf#page=315"],a[href$="doc"],a[href$="docx"],a[href$="xls"],a[href$="xlsx"],a[href$="ppt"],a[href$="pptx"],a[href$="txt"],a[href$="csv"],a[href$="jpg"],a[href$="jpeg"],a[href$="png"],a[href$="mov"],a[href$="wma"]').on('click', function(e) {
            var linkDelay = 500;
            var link_text = $(this).text();
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('downloads', link_text, link_url); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        // 5. Social Tracking
        // Links in the footer
        $('ul.social > a').on('click', function(e) { // Selector is a placeholder for redesign.
            var linkDelay = 500;
            var link_text = $(this).text();
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('social', link_text, link_url); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        /* Twitter follow button */
        /* Follow button not needed
        if ( typeof twttr !== 'undefined' ) {
            twttr.ready(function ( twttr ) {
                twttr.events.bind( 'click', trackTwitterFollow );
            });
        }

        function trackTwitterFollow() {
            try { track('social', 'follow', 'twitter'); }
            catch( error ) {}
        } */

        /* Facebook Like button */
        /* Follow button not needed
        if ( typeof FB !== 'undefined' ) {
            FB.Event.subscribe( 'edge.create', trackFacebookLike );
        }

        function trackFacebookLike() {
            try { track('social', 'follow', 'facebook'); }
            catch( error ) {}
        } */

        /* Social sharing buttons */
        /* Facebook */
        $('.share-facebook').on('click', function(e) { // Selector is a placeholder for redesign.
            var linkDelay = 500;
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('social', 'share', 'facebook'); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        /* Twitter */
        $('.share-twitter').on('click', function(e) { // Selector is a placeholder for redesign.
            var linkDelay = 500;
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('social', 'share', 'twitter'); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        /* Email */
        $('.share-email').on('click', function(e) { // Selector is a placeholder for redesign.
            var linkDelay = 500;
            var link_url = $(this).attr('href');
            // Stop the link from going anywhere
            // (it's ok we saved the href and we'll fire it later)
            e.preventDefault();
            try { track('social', 'share', 'email'); }
            catch( error ) {}

            // Give google analytics time to do its thing before changing the page url
            // http://support.google.com/analytics/answer/1136920?hl=en
            setTimeout(function() { document.location.href = link_url; }, linkDelay);
        });

        /* 6. Newsletter signup form */
        $('.signup').on('click', 'button', function() {
            var zip = $(this).closest('.signup').find('questionid_10376').val();
            track('social', 'signup', 'mailing list signup');
        });

        /* 7. Data tracking */
        /* On download button */
        $('#download .submit.btn').on('click', function() {
            track('downloads', 'HMDA raw data');
        });

        /* On focus of text area; also fires when button is clicked */
        $('#share .share_url').on('focus', function() {
            track('share URL link', 'HMDA box');
        });
    }); // End document ready.
}); // End anonymous function.

(function($) {
    'use strict';
    /**
     * ========================================================================
     * 8. Find and Track YouTube Videos
     * Find YouTube videos on a page and track them with google analytics
     * ========================================================================
     * cfpb.github.com: @davidakennedy, @mikem
     *
     * YouTube Iframe API Documentation
     * https://developers.google.com/youtube/iframe_api_reference
     * 
     * Code adapted from:
     * - http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/
     * - http://lunametrics.wpengine.netdna-cdn.com/js/lunametrics-youtube.js
     * Code adapted by Alex Mueller for ISITE Design http://isitedesign.com
     */

    $.fn.findAndTrackYouTubeVideos = function( ) {

        var videoObjects = [], // Stores all of the videos
            // Simple variable to track if the event was captured once,
            // we had a problem with events firing more than once in firefox
            // and during scrubbing so this is a temporary stopgap.
            wasTriggeredOnce = {
                playing: false,
                ended: false
            };

        function onPlayerStateChange( event ) {
            var videoIndex = event.target.id - 1;
            if ( event.data == YT.PlayerState.PLAYING && wasTriggeredOnce.playing === false ) {
                 wasTriggeredOnce.playing = true;
                try { track('videos', 'play', videoObjects[videoIndex].title); }
                catch( error ) {}
            } else if ( event.data == YT.PlayerState.ENDED && wasTriggeredOnce.ended === false ) {
                 wasTriggeredOnce.ended = true;
                try { track('videos', 'ended', videoObjects[videoIndex].title); }
                catch( error ) {}
            }
        }

        function isSrcYouTubeVideo( src ) {
            if ( !src ) {
                return;
            }
            if ( src.indexOf('youtube.com/embed/') !== -1 ) {
                return true;
            } else {
                return false;
            }
        }

        function getYouTubeVideoIdFromSrc( src ) {
            var videoId;
            // The ID comes after '/embed/'
            if ( src.substr( 0,24 ) == '//www.youtube.com/embed/' ) {
                videoId = src.substr( 24 );
            } else if ( src.substr( 0,29 ) == 'http://www.youtube.com/embed/' ) {
                videoId = src.substr( 29 );
            }
            else if ( src.substr( 0,30 ) == 'https://www.youtube.com/embed/' ) {
                videoId = src.substr( 30 );
            }
            // If the ID ends with extra characters remove them
            if ( videoId.indexOf('?') > -1 ) {
                videoId = videoId.substr( 0, videoId.indexOf('?') );
            }
            return videoId;
        }

        function checkInitConditions( e ) {
            var $e = $( e ),
                isIframe = $e.is('iframe'),
                notAlreadyTracked = !$e.is('[data-is-findAndTrackYouTubeVideos]'),
                hasYouTubeSrc = isSrcYouTubeVideo( $e.attr('src') );
            return ( isIframe && notAlreadyTracked && hasYouTubeSrc );
        }

        // Loop through each object to see if it meets our init conditions. If
        // it does then save the info we need for tracking and attach tracking
        // events.
        if ( $.fn.findAndTrackYouTubeVideos.isIframeApiReady ) {
            return this.each(function() {
                var $iframe = $( this ),
                    video = {};
                // Grab the video info we'll need to track it
                if ( checkInitConditions( $iframe ) ) {
                    video.id = getYouTubeVideoIdFromSrc( $iframe.attr('src') );
                    // Saving the title is trickier we need to pull it from the
                    // YouTube data API
                    $.ajax({
                        dataType: 'JSON',
                        url: 'https://gdata.youtube.com/feeds/api/videos/' + video.id + '?v=2&alt=json'
                    })
                    .done( function( data ) {
                        video.title = data.entry.title.$t;
                    });
                    // Flag this element so we know we're tracking it
                    $iframe.attr( 'data-is-findAndTrackYouTubeVideos', '' );
                    // Put the video ID on the iframe as its id attribute
                    $iframe.attr( 'id', video.id );
                    // Create a player to attach events to
                    video.player = new YT.Player( video.id, { events: { 'onStateChange': onPlayerStateChange } } );
                    // Save the video object so the events can reference it
                    if ( $.inArray( video, videoObjects === -1 ) ) {
                        videoObjects.push( video );
                    }
                }
            });
        } else {
            return false;
        }
    };

    $.fn.findAndTrackYouTubeVideos.isIframeApiReady = false;

}(jQuery));

/**
 * ============================================================================
 * YouTube API Functions
 * Keep this stuff in the global namespace
 * ============================================================================
 */

var tag = document.createElement('script');
tag.src = '//www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function gets called by the YouTube Iframe API
function onYouTubeIframeAPIReady() {
    'use strict';
    // We're only calling the plugin when the YouTube Iframe API is ready
    // because we need it to create YouTube player objects for tracking.
    $.fn.findAndTrackYouTubeVideos.isIframeApiReady = true;
    $('iframe').findAndTrackYouTubeVideos();
}

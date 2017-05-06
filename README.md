1. Get daily challenge page
GET https://tw.voicetube.com/everyday/20170311

2. Parse to get challenge id
some where in "core/zhTW/spkChallenges/CHALLENGE_ID/comments"

3. Get comments by challenge id
POST https://vtapi.voicetube.com/v2/core/zhTW/spkChallenges/CHALLENGE_ID/comments

4. And there you go
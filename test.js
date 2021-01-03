const lyric =`[00:00.000] 作词 : Finneas O'Connell
[00:01.000] 作曲 : Finneas O'Connell
[00:13.641]it never snows in LA
[00:19.304]You’d never know it was a holiday
[00:24.592]I don’t believe that Jesus Christ was born to save me
[00:31.272]That’s an awful lot of pressure for a baby
[00:37.128]But here we are again
[00:40.043]With family or friends
[00:42.994]Some extra time to spend
[00:45.188]And I’m not mad about it
[00:48.635]Don’t waste a dime on me
[00:51.919]Just want your company
[00:54.895]Beside a Christmas tree
[00:57.621]If the dog allows it
[01:00.130]
[01:02.753]Hurry home please
[01:05.795]I don’t belong without you
[01:14.636]Your ice-cold feet
[01:17.717]write all my songs about you
[01:26.507]I love you more and more each day
[01:32.790]Can’t find poetic ways to say
[01:38.746]“I hope it lasts another year”
[01:49.119]
[02:00.807]Don’t have a clue where I’ll be
[02:06.782]Except for next to you on New Year’s Eve
[02:12.844]I don’t believe a resolution’s gonna change me
[02:19.005]That’s an awful lot of bullshit
[02:22.330]Ain’t it baby
[02:24.187]
[02:24.863]But here we are tonight
[02:27.828]Drunk by the firelight
[02:30.969]The future could be bright
[02:33.080]Though no one’s sure about it
[02:36.674]And if the ending’s sad
[02:40.011]At least these times we’ve had
[02:43.063]The good outweighs the bad
[02:45.093]You wouldn’t know without it
[02:48.139]
[02:50.610]Hurry home please
[02:53.751]I don’t belong without you
[03:02.568]Your ice-cold feet
[03:05.643]write all my songs about you
[03:14.223]I love you more and more each day
[03:20.704]Can’t find poetic ways to say
[03:26.730]“I hope it lasts another year”
[03:36.867]`;
const lyricArr =lyric.split('\n');
const arr =[];
// [startTime,lyric,duration]
lyricArr.forEach(item=>{
    let temp =[];
    temp =item.split(']');
    temp[0]= temp[0].toString().substring(1);
     const timeArr = temp[0].split(':')
    const second = Number(timeArr[0])*60+Number(timeArr[1]);
    temp[0]=second;
    arr.push(temp)
})
console.log(arr);
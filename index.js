var tracery = require('tracery-grammar');
var chordGrammar = tracery.createGrammar({
  //'definition': ['6','7','maj','min','sus2','sus4','maj7','min7','dom7','dim','dim7','aug','sixth','Maj','m','Min','Dim','Dim7','Maj7','Min7','m7','Dom7','Sus2','Sus4','Aug','6th','Sixth'],
  'sadDefinition': ['min','min7'],
  'happyDefinition': ['maj','maj7','sus4'],
  'sassyDefinition': ['dom7','dim','dim7'],
  'sadNote': ['A','E','D'],
  'happyNote': ['C','F','G'],
  'sassyNote': ['B','G'],
  'chordType': ['#sadNote##sadDefinition#','#happyNote##happyDefinition#','#sassyNote##sassyDefinition#'],
  'text':['#chordType#'],
});

var rhythmGrammar = tracery.createGrammar({
  'groove': ['x__x__x-','x--x__x-','x--x--x_','x_x_x_--','xx-x-xx-','x_-x_-','x---'],
  'text':['#groove#'],
});

var melodyGrammar = tracery.createGrammar({
  'sadNote': ['a','e','d'],
  'happyNote': ['c','f','g'],
  'sassyNote': ['b','g'],
  'octave': ['3','4'],
  'black': ['#',''],
  'noteType': ['#sadNote##black##octave#','#happyNote##black##octave#','#sassyNote##black##octave#'],
  'text':['#noteType#']
})
var getRandomText = function(grammar) {
  return grammar.flatten('#text#');
}

var getText = function(grammar, textCount) {
  var textItems = [];
  for(var i = 0; i < textCount; i++) {
    var text = getRandomText(grammar);
    textItems.push(text);
  }
  return textItems;
}

var chordList = getText(chordGrammar, 8);
console.log('chordList:',chordList);

var rhythmList = getText(rhythmGrammar, 8);
console.log('rhythmList:',rhythmList);

var noteList = getText(melodyGrammar, 8);
console.log('noteList:',noteList);

const scribble = require('scribbletune');
let chords, melody, bass
chords = scribble.clip({
    notes: chordList,
    pattern: rhythmList.join(''),
    sizzle: true
});
scribble.midi(chords, 'chordline.mid');

melody = scribble.clip({
    notes: noteList,
    pattern: rhythmList.join(''),
    shuffle: true
})
scribble.midi(melody, 'melody.mid');

bass = scribble.clip({
    notes: chordList.slice(0, 3),
    pattern: '--x-'.repeat(16),
    shuffle: true
});
scribble.midi(bass, 'bass.mid');

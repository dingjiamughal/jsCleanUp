const s = 'Let\'s study hard and progress together';

function reverse1(str) {
    return str.split(' ').map(item => (item.split('').reverse().join(''))).join(' ');
}

console.log(reverse1(s)); // s'teL yduts drah dna ssergorp rehtegot

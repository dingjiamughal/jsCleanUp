const food = {
  rice: '米饭',
  vegetable: '蔬菜',
  fish: '鱼'
};

function choose(type: keyof typeof food) {
  console.log(type);
}

choose('xxx'); // fail
choose('rice'); // pass

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '项目名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'title',
        message: '标题'
      }
    ]).then(res => {
      console.log(res);
      this.answers = res;
    });
  }
  writing() {
    const tmp1 = this.templatePath('1.txt');
    const output = this.destinationPath('output.txt');

    // 上下文，替代 ejs 模板
    const context = this.answers;

    this.fs.copyTpl(tmp1, output, context);
  }
};

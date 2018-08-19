'use strict';

// The activeIndex changes at regular time intervals.  Since activeIndex is stored as a state variable, each time the active index
//is updated, the texture-container will render active.  If the active index equals the value of the index for the enumerated texture,
//it's assigned an "active-texture" class whereas the other textures are assigned "inactive-texture class"

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Character = function (_React$Component) {
  _inherits(Character, _React$Component);

  function Character(props) {
    _classCallCheck(this, Character);

    var _this = _possibleConstructorReturn(this, (Character.__proto__ || Object.getPrototypeOf(Character)).call(this, props));

    _this.state = {
      health: 10,
      isDead: false

    };

    _this.takeDamage = _this.takeDamage.bind(_this);
    return _this;
  }

  _createClass(Character, [{
    key: "takeDamage",
    value: function takeDamage() {
      console.log("Character has taken damage!");
      this.setState(function (prevState) {

        if (prevState.health == 0) {
          return {
            health: prevState.health - 1,
            isDead: true
          };
        } else {
          return { health: prevState.health - 1 };
        }
      });

      console.log("New health is:" + this.state.health);
    }
  }, {
    key: "render",
    value: function render() {

      var textures1 = ["wingMan1", "wingMan2", "wingMan3", "wingMan4", "wingMan5", "wingMan4", "wingMan3", "wingMan2", "wingMan1"];
      var textures2 = ["regularExplosion00", "regularExplosion01", "regularExplosion02", "regularExplosion03", "regularExplosion04", "regularExplosion05", "regularExplosion06", "regularExplosion07", "regularExplosion08"];

      if (!this.state.isDead) {
        return React.createElement(
          "div",
          { className: "character-container", onClick: this.takeDamage },
          React.createElement(TextureAnimation, { basePath: "https://suzhoupanda.github.io/img/characters/",
            textureExtension: ".png",
            textures: textures1,
            isRepeating: true }),
          React.createElement(
            "p",
            { className: "click-me" },
            "Clicke the character to attack! "
          ),
          React.createElement(
            "p",
            { className: "health-meter" },
            "Current Health: ",
            this.state.health
          )
        );
      } else {
        return null;
      }
    }
  }]);

  return Character;
}(React.Component);

var TextureAnimation = function (_React$Component2) {
  _inherits(TextureAnimation, _React$Component2);

  function TextureAnimation(props) {
    _classCallCheck(this, TextureAnimation);

    var _this2 = _possibleConstructorReturn(this, (TextureAnimation.__proto__ || Object.getPrototypeOf(TextureAnimation)).call(this, props));

    _this2.state = {
      animationInterval: 50,
      activeIndex: 0,
      maxIndex: _this2.props.textures.length - 1,
      isRepeating: _this2.props.isRepeating,
      hasCompleted: false
    };
    return _this2;
  }

  _createClass(TextureAnimation, [{
    key: "startAnimation",
    value: function startAnimation() {

      var updateActiveIndex = this.updateActiveIndex;

      var textureAnimation = this;

      this.timerID = setInterval(function () {

        if (textureAnimation.state.activeIndex >= textureAnimation.state.maxIndex) {

          if (textureAnimation.state.isRepeating) {
            textureAnimation.setState({ activeIndex: 0 });
          } else {
            textureAnimation.setState({ hasCompleted: true });
          }
        } else {

          textureAnimation.setState(function (prevState) {
            return {
              activeIndex: prevState.activeIndex + 1
            };
          });
        }
      }, this.state.animationInterval);
    }
  }, {
    key: "endAnimation",
    value: function endAnimation() {
      clearInterval(this.timerID);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startAnimation();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.endAnimation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var textureImages = this.props.textures.map(function (textureName, index) {
        var isActiveTexture = index == _this3.state.activeIndex;

        return React.createElement("img", { src: _this3.props.basePath + textureName + _this3.props.textureExtension,
          key: index,
          className: isActiveTexture ? "texture active-texture" : "texture inactive-texture"
        });
      });

      if (!this.state.hasCompleted) {
        return React.createElement(
          "div",
          { className: "texture-container" },
          textureImages
        );
      } else {

        return null;
      }
    }
  }]);

  return TextureAnimation;
}(React.Component);

;

ReactDOM.render(React.createElement(Character, null), document.getElementById("main-container"));
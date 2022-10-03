"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.getUser = exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _apiService = _interopRequireDefault(require("../../app/apiService"));

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null
};
var slice = (0, _toolkit.createSlice)({
  name: "user",
  initialState: initialState,
  reducers: {
    startLoading: function startLoading(state) {
      state.isLoading = true;
    },
    hasError: function hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess: function getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess: function updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    }
  }
});
var _default = slice.reducer;
exports["default"] = _default;

var getUser = function getUser(id) {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(slice.actions.startLoading());
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_apiService["default"].get("/users/".concat(id)));

          case 4:
            response = _context.sent;
            dispatch(slice.actions.getUserSuccess(response.data));
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            dispatch(slice.actions.hasError(_context.t0.message));

            _reactToastify.toast.error(_context.t0.message);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.getUser = getUser;

var updateUserProfile = function updateUserProfile(_ref) {
  var userId = _ref.userId,
      name = _ref.name,
      avatarUrl = _ref.avatarUrl,
      coverUrl = _ref.coverUrl,
      aboutMe = _ref.aboutMe,
      city = _ref.city,
      country = _ref.country,
      jobTitle = _ref.jobTitle,
      facebookLink = _ref.facebookLink,
      twitterLink = _ref.twitterLink,
      linkedinLink = _ref.linkedinLink,
      instagramLink = _ref.instagramLink;
  return function _callee2(dispatch) {
    var data, response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(slice.actions.startLoading());
            _context2.prev = 1;
            data = {
              facebookLink: facebookLink,
              twitterLink: twitterLink,
              linkedinLink: linkedinLink,
              instagramLink: instagramLink
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_apiService["default"].put("/users/".concat(userId), data));

          case 5:
            response = _context2.sent;
            dispatch(slice.actions.updateUserProfileSuccess(response.data));

            _reactToastify.toast.success("Update profile successfully");

            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            dispatch(slice.actions.hasError(_context2.t0.message));

            _reactToastify.toast.error(_context2.t0.message);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.updateUserProfile = updateUserProfile;
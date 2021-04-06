const { Courses, Paths, Users } = require("./schema");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, createRefeshToken } = require("./auth");
const { sendRefreshToken } = require("./sendRefreshToken");
const { getcurrUser, setCurrUser } = require("./currUser");

const resolvers = {
  Query: {
    findall: () => Courses.find(),
    findcourse: (_, { course_id }) => {
      return Courses.findOne({ course_id: course_id }, function (err, obj) {});
    },
    findallpaths: () => Paths.find(),

    findpath: (_, { course_id }) => {
      return Paths.findOne(
        { "courses.course_id": course_id },
        function (err, obj) {}
      );
    },

    findpathid: (_, { id }) => {
      return Paths.findOne({ path_id: id }, function (err, obj) {});
    },

    finduser: () => Users.find(),

    userdata: (_, { id }) => {
      return Users.findById(id);
    },
    me: (_, {}, req) => {
      return getcurrUser();
    },
  },
  Mutation: {
    modulequestion: async (_, { id, flashes, courseid, moduleid }) => {
      var flag = 0;
      var temp = await Users.findById(id);

      for (var i = 0; i < temp.courses.inprogress_courses.length; i++) {
        if (temp.courses.inprogress_courses[i].course_id === courseid) {
          for (
            var k = 0;
            k < temp.courses.inprogress_courses[i].module.length;
            k++
          ) {
            if (
              temp.courses.inprogress_courses[i].module[k].module_id ===
              moduleid
            ) {
              if (
                temp.courses.inprogress_courses[i].module[k].question_flag === 0
              ) {
                temp.courses.inprogress_courses[i].module[k].question_flag = 1;
              } else {
                flag = 1;
              }
            }
          }
        }
      }
      if (flag === 0) {
        var tempflahses = parseInt(temp.flashes) + parseInt(flashes);
        await Users.findByIdAndUpdate(id, { $set: { flashes: tempflahses } });
        await Users.findByIdAndUpdate(id, {
          "courses.inprogress_courses": temp.courses.inprogress_courses,
        });
      }
    },

    createUser: async (_, { email, password, name, username }) => {
      const hashedPassword = await hash(password, 12);
      const User = new Users({
        email,
        password: hashedPassword,
        name,
        user_name: username,
      });
      try {
        await User.save();
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    googlesign: async (_, { email, name, googleId }, { res }) => {
      const CheckUser = await Users.findOne({ email: email });
      if (!CheckUser) {
        const User = new Users({
          email,
          name,
          googleId,
        });
        try {
          await User.save();
        } catch (err) {
          console.log(err);
          throw new Error("could not create User");
        }
      }
      const User = await Users.findOne({ email: email });
      if (User.googleId != googleId) {
        try {
          await Users.findOneAndUpdate(
            { email: email },
            {
              $set: {
                googleId: googleId,
              },
            }
          );
        } catch (err) {
          console.log(err);
          throw new Error("could not create User");
        }
      }

      sendRefreshToken(res, createRefeshToken(User));
      setCurrUser(User.id);
      return { accessToken: createAccessToken(User), userId: User.id };
    },

    login: async (_, { email, password }, { res }) => {
      const User = await Users.findOne({ email: email });
      if (!User) {
        throw new Error("could not find the user");
      }
      const valid = await compare(password, User.password);
      if (!valid) {
        throw new Error("bad password");
      }
      if (email === "admin@admin.com") {
        sendRefreshToken(res, createRefeshToken(User));
        setCurrUser(User.id);
        return {
          accessToken: createAccessToken(User),
          userId: User.id,
          flag: true,
        };
      }

      //login succesfull
      sendRefreshToken(res, createRefeshToken(User));
      setCurrUser(User.id);
      return {
        accessToken: createAccessToken(User),
        userId: User.id,
        flag: false,
      };
    },

    addinprogresscourseuser: async (
      _,
      { id, course_id, course_name1, course_name2, module, flashes }
    ) => {
      var temp = await Users.findById(id);
      var tempflashes = temp.flashes;

      tempflashes = parseInt(tempflashes);

      tempflashes = tempflashes - parseInt(flashes);

      await Users.findByIdAndUpdate(id, {
        $set: {
          flashes: String(tempflashes),
        },
      });
      var currentcourses = {
        course_id: course_id,
        course_name1: course_name1,
        course_name2: course_name2,
        course_completed: 0,
        module: module,
      };

      await Users.findByIdAndUpdate(id, {
        $push: { "courses.inprogress_courses": currentcourses },
      });
      return true;
    },

    addcompletedcourseuser: async (_, { id, course_id }) => {
      var temp = await Users.findById(id);
      var k = null;
      for (var i = 0; i < temp.courses.inprogress_courses.length; i++) {
        if (temp.courses.inprogress_courses[i].course_id === course_id) {
          temp.courses.inprogress_courses[i].course_completed = 1;
          k = i;
        }
      }
      await Users.findByIdAndUpdate(id, {
        $pull: {
          "courses.inprogress_courses": {
            course_id: course_id,
          },
        },
      });

      await Users.findByIdAndUpdate(id, {
        $push: {
          "courses.inprogress_courses": temp.courses.inprogress_courses[k],
        },
      });
      return true;
    },
    //change for question flag
    usercoursemoduleupdate: async (_, { id, module, course_id }) => {
      var temp = await Users.findById(id);
      var k = null;
      for (var i = 0; i < temp.courses.inprogress_courses.length; i++) {
        if (temp.courses.inprogress_courses[i].course_id === course_id) {
          temp.courses.inprogress_courses[i].module = module;
          k = i;
        }
      }
      await Users.findByIdAndUpdate(id, {
        $pull: {
          "courses.inprogress_courses": {
            course_id: course_id,
          },
        },
      });

      await Users.findByIdAndUpdate(id, {
        $push: {
          "courses.inprogress_courses": temp.courses.inprogress_courses[k],
        },
      });
      return true;
    },
    addinprogresspathuser: async (
      _,
      { id, path_id, path_title1, path_title2, courses, flashes }
    ) => {
      var temp = await Users.findById(id);
      var tempflashes = temp.flashes;

      tempflashes = parseInt(tempflashes);

      tempflashes = tempflashes - parseInt(flashes);

      await Users.findByIdAndUpdate(id, {
        $set: {
          flashes: String(tempflashes),
        },
      });
      var currentpath = {
        path_id: path_id,
        path_title1: path_title1,
        path_title2: path_title2,
        courses: courses,
      };
      var temp = [];
      // var tempuserdata = Users.findById(id);
      // console.log("userdata==" + tempuserdata);

      for (var i = 0; i < courses.length; i++) {
        if (
          !(await Users.findOne({
            _id: id,
            "courses.inprogress_courses.course_id": courses[i].course_id,
          }))
        ) {
          temp.push(await Courses.findOne({ course_id: courses[i].course_id }));
        }
      }

      for (var i = 0; i < temp.length; i++) {
        var tempmodule = [];
        var temp2 = {};
        for (var k = 0; k < temp[i].modules.length; k++) {
          tempmodule.push({
            module_id: temp[i].modules[k].module_id,
            module_name: temp[i].modules[k].module_name,
            flag: 0,
          });
        }
        var temp2 = {
          course_id: temp[i].course_id,
          course_name1: temp[i].course_name1,
          course_name2: temp[i].course_name2,
          course_completed: 0,
          module: tempmodule,
        };

        await Users.findByIdAndUpdate(id, {
          $push: { "courses.inprogress_courses": temp2 },
        });
      }

      try {
        await Users.findByIdAndUpdate(id, {
          $push: { "paths.inprogress_paths": currentpath },
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },

    addcompletedpathuser: async (_, { id }) => {
      var completedpath = {
        path_id: "yoyo420",
        path_title1: "Lorem & Dollar",
        path_title2: "Lorem & Dollar",
        courses: [
          {
            course_id: "fasjkknsijfiew",
            course_name1: "Nmap",
            flag: 2,
          },
          {
            course_id: "fasjkknsijfiew",
            course_name1: "Nmap",
            flag: 1,
          },
          {
            course_id: "fasjkknsijfiew",
            course_name1: "Nmap",
            flag: 0,
          },
        ],
      };
      await Users.findByIdAndUpdate(id, {
        $pull: {
          "paths.inprogress_paths": {
            path_id: completedpath.path_id,
          },
        },
      });
      await Users.findByIdAndUpdate(id, {
        $push: { "paths.completed_paths": completedpath },
      });
      return true;
    },

    changeuserprofileinfo: async (
      _,
      { id, first_name, last_name, profession, username }
    ) => {
      await Users.findByIdAndUpdate(id, {
        $set: {
          first_name: first_name,
          last_name: last_name,
          profession: profession,
          user_name: username,
        },
      });
      return true;
    },

    changeuseraccountinfo: async (_, { id, user_name, password, email }) => {
      var hasedpassword = await hash(password, 12);

      await Users.findByIdAndUpdate(id, {
        $set: {
          password: hasedpassword,
          user_name: user_name,
          email: email,
        },
      });
      return true;
    },
  },
};
module.exports = { resolvers };

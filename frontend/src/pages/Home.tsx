import { Box } from "@mui/material";
// import React from "react";
// import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
// import { CgEnter } from "react-icons/cg";

const Home = () => {
  // const theme = useTheme();
  // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            alightContent: "flex-end",
            justifyContent: "center",
            gap: 0,
            my: 10,
          }}
        >
          <Box
            sx={{
              px: { md: "180px", xs: "30px", sm: "30px" },
              fontSize: {md: "3vw", sm: "6vw", xs: "6vw"}
            }}
          >
            <h1
              style={{
                textAlign: "right",
                padding: "0",
                margin: "0",
                color: "#f9bc60",
              }}
            >
              FREE<br></br>EDUCATION<br></br>FOR ALL
            </h1>
          </Box>
          <Box
            sx={{
              px: { md: "180px", xs: "30px", sm: "30px" },
            }}
          >
            <h3
              style={{
                fontSize: "2vw",
                textAlign: "right",
                padding: "0",
                margin: "0",
                color: "#e8e4e6"
              }}
            >
              Using AI Tutoring with teacher leadership
            </h3>
          </Box>
          <Box
            sx={{
              px: { md: "180px", xs: "30px", sm: "30px" },
            }}
          >
            <h3
              style={{
                fontSize: "2vw",
                textAlign: "right",
                padding: "0",
                margin: "0",
                color: "#e8e4e6"
              }}
            >
              See our mission statement
            </h3>
          </Box>
        </Box>

        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { md: "80px", xs: "30px", sm: "30px" },
            gap: 5,
            bgcolor: "#abd1c6"
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color: "#001e1d"
            }}
          >
            We believe that every child, regardless of location, should have the
            opportunity for free education or at least the lowest cost possible
          </h3>
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color: "#004643"
            }}
          >
            With the world’s smartest tutor by their side, tailored learning will become a reality, accelerating knowledge acquisition based on individual effort and desire.
          </h3>

          <h2
            style={{
              fontSize: "30px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color:"#001e1d",
            }}
          >
            OUR MISSION
          </h2>
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color: "#001e1d"
            }}
          >
            Our mission is to harness Artificial intelligence, aiming to provide universal access to education. We are developing a platform that fosters the student-teacher relationship, enhanced by AI to offer personalized tutoring. This AI assistant would adapt to each student’s pace and preferences, augmenting the traditional educational model rather than competing with it. Our organization is committed to this ideal, seeking to make high-quality education accessible to all at no cost or at the lowest cost possible. 
          </h3>

        </Box>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { md: "80px", xs: "30px", sm: "30px" },
            gap: 5
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color:"#abd1c6",
            }}
          >
            Making transparency key to the Organization
          </h2>
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color: "#e8e4e6"
            }}
          >
            "We are committed to building a contributor-funded nonprofit organization that operates with integrity and efficiency—a venture we can all be proud of. Transparency is at the core of our values; therefore, all donors will have unrestricted access to our financial records via our website at any time. Our pledge is to embody a model of financial prudence, ensuring that every dollar donated is utilized judiciously. Our primary objective is to minimize administrative and operational expenses, maximizing the allocation of funds directly towards providing free education. This approach ensures that the largest possible portion of donor contributions goes directly to our mission of making education accessible to all."
          </h3>

          <h2
            style={{
              fontSize: "30px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color:"#abd1c6",
            }}
          >
            How Far we have come
          </h2>
          <h3
            style={{
              fontSize: "20px",
              textAlign: "center",
              padding: "0",
              margin: "0",
              color: "#e8e4e6"
            }}
          >
            We have written the code for our Platform. The interactive program connects teachers to children and children to CHATGPT . We use two different types of AI channels to protect against “hallucinations” , a common phenomenon that Bots will give convincing false answers. We think the usage of “Two brains is better than one” may be a game changer to the industry regarding this problem.

It is too early to know the Teacher-to-student Ratio, because we are uncertain of the participation of the government-run schools. but the program will be lead by certified teachers.

We have also used AI to test the system itself. This process is giving us amazing insight in the powers and concerns with this Bot Tutoring.

We are currently in the stage of testing. The speed and quality of that will depend on the amount of funds we receive from contributors.
          </h3>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;

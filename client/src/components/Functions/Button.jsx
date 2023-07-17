import "./styles.css";
import Button from "@mui/material/Button";

const Button2 = (pops) => {
  return (
    <>
      <button className="btn">
        <div className="wrapper">
          <p className="text">{pops.title}</p>

          <div className="flower flower1">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower2">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower3">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower4">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower5">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower6">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower7">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
          <div className="flower flower8">
            <div className="petal one"></div>
            <div className="petal two"></div>
            <div className="petal three"></div>
            <div className="petal four"></div>
          </div>
        </div>
      </button>
      {/* <Button
        variant="contained"
        sx={{ height: "45px", mt: { xs: 9, sm: 6, md: 6 } }}
      >
        Create Post
      </Button>{" "} */}
    </>
  );
};

export default Button2;

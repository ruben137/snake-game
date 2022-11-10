import { Box, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import Snake from "./Snake";

interface Props {
  backgroundColor: string;
  sx?: SxProps<Theme> | undefined;
}
const Pixel = ({ sx }: { sx?: SxProps<Theme> | undefined }) => (
  <Box sx={{ width: "10px", height: "10px", ...sx }}></Box>
);
const CrossPiece = ({ sx, backgroundColor }: Props) => {
  return (
    <Box
      sx={{
        width: "60px",
        height: "60px",
        display: "flex",
        flexWrap: "wrap",
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "20px",
          bgcolor: "#fdc006",
          height: "20px",
          position: "relative",
        }}
      ></Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: backgroundColor,
          height: "20px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Pixel sx={{ bgcolor: "#35464e" }} />
        <Pixel sx={{ bgcolor: "#35464e" }} />
      </Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: "#fdc006",
          height: "20px",
        }}
      ></Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: backgroundColor,
          height: "20px",
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <Pixel sx={{ bgcolor: "#35464e" }} />
        <Pixel sx={{ bgcolor: "#35464e" }} />
        <Pixel sx={{ bgcolor: "#fd9f00", top: "20px", position: "absolute" }} />
        <Pixel
          sx={{
            bgcolor: "#fd9f00",
            top: "20px",
            position: "absolute",
            right: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: backgroundColor,
          height: "20px",
        }}
      ></Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: backgroundColor,
          height: "20px",
          display: "flex",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <Pixel sx={{ bgcolor: "#35464e" }} />
        <Pixel sx={{ bgcolor: "#35464e" }} />
        <Pixel sx={{ bgcolor: "#fd9f00", top: "20px", position: "absolute" }} />
        <Pixel
          sx={{
            bgcolor: "#fd9f00",
            top: "20px",
            position: "absolute",
            right: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: "#fdc006",
          height: "20px",
        }}
      ></Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: backgroundColor,
          height: "20px",
          position: "relative",
        }}
      >
        {" "}
        <Pixel sx={{ bgcolor: "#fd9f00", top: "20px", position: "absolute" }} />
        <Pixel
          sx={{
            bgcolor: "#fd9f00",
            top: "20px",
            position: "absolute",
            right: 0,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "20px",
          bgcolor: "#fdc006",
          height: "20px",
        }}
      ></Box>
    </Box>
  );
};

const GameBoy = () => {
  return (
    <Box sx={{ width: "100%"}}>
      <Navbar/>
      <Grid container direction="row" spacing={2} justifyContent={"center"} sx={{mt:2}}>
        <Grid item md={3} xs={12}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#fdc006",
              p: 2,
              // borderRadius: "8px",
              border: "10px solid #fdb200",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "#212121",
                left: -10,
                top: -10,
                position: "absolute",
              }}
            />
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "#212121",
                right: -10,
                top: -10,
                position: "absolute",
              }}
            />
            <Box
              sx={{
                width: "10px",
                height: "10px",
                bgcolor: "#212121",
                left: -10,
                bottom: -10,
                position: "absolute",
              }}
            />
            <Box
              sx={{
                width: "40px",
                height: "40px",
                bgcolor: "#212121",
                right: -10,
                bottom: -10,
                position: "absolute",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdb200",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdc005",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdb200",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdc005",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdb200",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#fdb200",
                }}
              />{" "}
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />{" "}
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />{" "}
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />{" "}
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  bgcolor: "#212121",
                }}
              />
            </Box>
            <Box
              sx={{ bgcolor: "#35464e", py: 3, px: 4, position: "relative" }}
            >
              <Pixel
                sx={{
                  bgcolor: "#fdc20e",
                  top: 0,
                  position: "absolute",
                  right: 0,
                }}
              />
              <Pixel
                sx={{
                  bgcolor: "#fdc20e",
                  top: 0,
                  position: "absolute",
                  left: 0,
                }}
              />
              <Pixel
                sx={{
                  bgcolor: "#fdc20e",
                  bottom: 0,
                  position: "absolute",
                  left: 0,
                }}
              />
              <Box sx={{ bottom: 0, position: "absolute", right: 0 }}></Box>
              <Box
                sx={{
                  bgcolor: "#fdc20e",
                  bottom: 0,
                  position: "absolute",
                  right: 0,
                  display: "flex",
                  flexWrap: "wrap",
                  width: "30px",
                  height: "30px",
                }}
              >
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#35464e",
                  }}
                />
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#35464e",
                  }}
                />
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#fdc006",
                  }}
                />
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#35464e",
                  }}
                />{" "}
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#fdc006",
                  }}
                />{" "}
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#fdc006",
                  }}
                />
                <Pixel
                  sx={{
                    width: "10px",
                    height: "10px",
                    bgcolor: "#fdc006",
                  }}
                />
              </Box>
              <Snake />
            </Box>
            <Box
              sx={{
                py: 4,
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CrossPiece backgroundColor="#263137" />
              <Box
                sx={{
                  width: "70px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "30px",
                    display: "flex",
                    height: "50px",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{ width: "30px", display: "flex", flexWrap: "wrap" }}
                  >
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "30px",
                    display: "flex",
                    height: "50px",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{ width: "30px", display: "flex", flexWrap: "wrap" }}
                  >
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#35464e",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                    <Pixel
                      sx={{
                        width: "10px",
                        height: "10px",
                        bgcolor: "#263137",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameBoy;

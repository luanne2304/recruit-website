import React, { useState, useEffect } from "react";
import moment from "moment"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PaidIcon from "@mui/icons-material/Paid";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PlaceIcon from "@mui/icons-material/Place";
import SendIcon from "@mui/icons-material/Send";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import FlagIcon from "@mui/icons-material/Flag";
import Logocty from "../../assets/images/logocty.jpg";
import COjob from "../../components/COjob/COjob";
import ReportformDialog from "../../components/ReportformDialog/ReportformDialog";
import DialogApplyCV from "../../components/DialogApplyCV/DialogApplyCV";
import ReportService from "../../services/ReportService";
import postService from "../../services/postService";
import { useAuth  } from "../../utils/authUtils";
import { useParams } from "react-router-dom";
import "./DetailJob.css";

const DetailJob = () => {
  const { accessToken,setAccessToken } = useAuth()
  const [openApply, setOpenApply] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [fetchpost, setFetchpost] = useState(null);

  const { idjob } = useParams();

  const handleChangeApply = () => {
    setOpenApply(true);
  };

  const handleChangeReport = () => {
    setOpenReport(true);
  };

  const handleSubmit = async (reason) => {
    try {
      const res = await ReportService.create(idjob,reason,accessToken);  
      console.log(res)
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
    }
  };

  useEffect(() => {
    const getALLjob = async () => {
      try {
        const res = await postService.getJobbyID(idjob)
        setFetchpost(res.data);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
      }
    };

    getALLjob();
  }, []);

  return (
    <>
      <ReportformDialog setOpen={setOpenReport} open={openReport} onSubmit={handleSubmit}></ReportformDialog>
      <DialogApplyCV setOpen={setOpenApply} open={openApply}></DialogApplyCV>
      <Box>
        <Box className="main">
          <Box className="icontainer" sx={{ width: "1170px", mt: 8 }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box className="main-container-wrap-detailjob">
                <Box>
                  <Card sx={{ width: "100%" }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <Typography variant="h6">
                        {fetchpost && fetchpost.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 10 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PaidIcon sx={{ fontSize: "40px", mr: 2 }}></PaidIcon>
                          <Box>
                            <Typography variant="body2">Mức lương</Typography>
                            <Typography variant="body2">
                              {fetchpost && fetchpost.salaryfrom} -{" "}
                              {fetchpost && fetchpost.salaryto} USD
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <WorkOutlineIcon
                            sx={{ fontSize: "40px", mr: 2 }}
                          ></WorkOutlineIcon>
                          <Box>
                            <Typography variant="body2">Hình thức</Typography>
                            <Typography variant="body2">
                              {fetchpost && fetchpost.form}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <PlaceIcon
                            sx={{ fontSize: "40px", mr: 2 }}
                          ></PlaceIcon>
                          <Box>
                            <Typography variant="body2">Địa điểm</Typography>
                            <Typography variant="body2">{fetchpost && fetchpost.address.city}</Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          sx={{ width: "70%" }}
                          variant="contained"
                          color="success"
                          endIcon={<SendIcon />}
                          onClick={handleChangeApply}
                        >
                          Ứng tuyển
                        </Button>
                        <Typography
                          variant="body2"
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <AccessTimeIcon></AccessTimeIcon>Thời hạn nộp :
                          {fetchpost && moment(fetchpost.duration).format('DD/MM/YYYY')}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card sx={{ width: "100%" }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <Typography variant="h6">Chi tiết tuyển dụng</Typography>
                      <Box>
                        <Typography variant="h6">Mô tả công việc</Typography>
                        <Typography>
                          {fetchpost && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: fetchpost.des,
                              }}
                            ></div>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">Yêu cầu ứng viên</Typography>
                        <Typography>
                          {fetchpost && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: fetchpost.require,
                              }}
                            ></div>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">Quyền lợi</Typography>
                        <Typography>
                          {fetchpost && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: fetchpost.benefit,
                              }}
                            ></div>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6">Địa chỉ làm việc</Typography>
                        <Typography>
                          {fetchpost && fetchpost.address.streetnumber +", "+fetchpost.address.ward +", "+fetchpost.address.district +", "+fetchpost.address.city}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          sx={{ width: "20%" }}
                          variant="contained"
                          color="error"
                          endIcon={<FlagIcon />}
                          onClick={handleChangeReport}
                          
                        >
                          Báo cáo
                        </Button>
                        <Button
                          sx={{ width: "70%" }}
                          variant="contained"
                          color="success"
                          endIcon={<SendIcon />}
                          onClick={handleChangeApply}
                        >
                          Ứng tuyển
                        </Button>
                      </Box>

                      <Typography variant="h6">
                        Các công việc liên quan
                      </Typography>
                      {/* <COjob></COjob> */}
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              <Box className="extra-container-wrap-detailjob">
                <Box>
                  <Card sx={{ width: "100%" }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img src={fetchpost && fetchpost.CO.logo} className="logoCO-DetailJob" />
                        <Typography variant="h5">{fetchpost && fetchpost.CO.name}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                        <Typography > Quy mô:</Typography>
                        <Typography>{fetchpost && fetchpost.CO.scalefrom}-{fetchpost && fetchpost.CO.scaleto} nhân viên</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <PlaceIcon></PlaceIcon>
                        <Typography sx={{ width: "110px" }}>
                          Địa chỉ:
                        </Typography>
                        <Typography>
                          {fetchpost && fetchpost.CO.address.map((i, index)=>(
                            <Box key={index} sx={{mb:1}} >
                            Cơ sở {index+1}: {i.streetnumber}, {i.ward}, {i.district}, {i.city} 
                            </Box>
                          ))}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
                <Box>
                  <Card sx={{ width: "100%" }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <Typography variant="h5">Thông tin chung</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                        <Typography> Kinh nghiệm:</Typography>
                        <Typography>
                          {fetchpost &&
                            fetchpost.tag.exp.map((exp, index) =>
                              index === fetchpost.tag.exp.length - 1
                                ? exp
                                : exp + ", "
                            )}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                        <Typography> Hình thức làm việc:</Typography>
                        <Typography> {fetchpost && fetchpost.form}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <SupervisedUserCircleIcon></SupervisedUserCircleIcon>
                        <Typography> Kĩ năng:</Typography>
                        <Typography>
                          {fetchpost &&
                            fetchpost.tag.skill.map((skill, index) =>
                              index === fetchpost.tag.skill.length - 1
                                ? skill
                                : skill + ", "
                            )}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailJob;

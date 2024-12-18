import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Class from './component/user/class/Class';
import Operation from './component/user/operation/Operation';
import Practice from './component/user/practice/Practice';
import Rating from './component/user/rating/Rating';
import RatingCheck from './component/user/ratingcheck/RatingCheck';
import Union from './component/user/union/Union';
import PracticeWrite from './component/user/practice/PracticeWrite';
import GeneralJoin from './component/join/GeneralJoin';
import InstitutionalJoin from './component/join/InstitutionalJoin';
import Login from './component/login/Login';
import FindID from './component/login/FindID';
import FindPassword from './component/login/FindPassword';
import Header from './component/Header';
import JoinSelect from './component/join/JoinSelect';
import ManagerInfo from './component/manager/info/ManagerInfo';
import MatchCheck from './component/manager/matchingcheck/MatchCheck';
import ManagerInfoModify from './component/manager/info/ManagerInfoModify';
import Calendar from './component/manager/calendar/Calendar';
import Main from './component/main/Main';
import Footer from './component/Footer';
import StudentPage from './component/user/matching/StudentPage';
import TeacherPage from './component/user/matching/TeacherPage';
import PracticeUpdate from './component/user/practice/PracticeUpdate';
import PracticeBoardDetail from './component/user/practice/PracticeBoardDetail';
import TeacherAttendanceApproval from './component/user/attendance/TeacherAttendanceApproval';
import AttendanceStatusPage from './component/user/attendance/AttendanceStatusPage';
import TeacherMatchedStudentsAttendancePage from './component/user/attendance/TeacherMatchedStudentsAttendancePage';
import MyPage from './component/user/mypage/Mypage';
import Admin from './component/admin/Admin';
import MemberManagement from './component/admin/MemberManagement';
import MatchStatusPage from './component/user/matching/MatchStatusPage';
import MatchInfo from './component/user/matching/MatchInfo';
import AdminMatches from './component/admin/AdminMatches';
import MatchedInfoPage from './component/admin/MatchedInfoPage';
import ClassBoardDetail from './component/user/class/ClassBoardDetail';
import ClassUpdate from './component/user/class/ClassUpdate';
import ClassWrite from './component/user/class/ClassWrite';
import UnionBoardDetail from './component/user/union/UnionBoardDetail';
import UnionUpdate from './component/user/union/UnionUpdate';
import UnionWrite from './component/user/union/UnionWrite';
import OperationBoardDetail from './component/user/operation/OperationBoardDetail';
import OperationUpdate from './component/user/operation/OperationUpdate';
import OperationWrite from './component/user/operation/OperationWrite';
import SchoolList from './component/manager/listmanagement/SchoolList';
import CollegeList from './component/manager/listmanagement/CollegeList';
import FieldInternship from './component/main/FieldInternship';
import OperationModel from './component/main/OperationModel';
import FieldInternshipOverview from './component/main/FieldInternshipOverview';
import CentralSupport from './component/main/CentralSupport';
import CentralSupportProgram from './component/main/CentralSupportProgram';
import Listmgmt from './component/manager/listmanagement/Listmgmt';
import Gallery from './component/user/gallery/Gallery';

function App() {
  const [postArray, setPostArray] = useState([]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Practice" element={<Practice posts={postArray} />} />
            <Route path="/PracticeWrite" element={<PracticeWrite postArray={postArray} setPostArray={setPostArray} />} />
            <Route path="/Class" element={<Class />} />
            <Route path="/Operation" element={<Operation />} />
            <Route path="/Union" element={<Union />} />
            <Route path="/Rating" element={<Rating />} />
            <Route path="/RatingCheck" element={<RatingCheck />} />
            <Route path="/join/generaljoin" element={<GeneralJoin />} />
            <Route path="/join/institutionalJoin" element={<InstitutionalJoin />} />
            <Route path="/joinselect" element={<JoinSelect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findid" element={<FindID />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/managerInfo" element={<ManagerInfo />} />
            <Route path="/managerInfoModify" element={<ManagerInfoModify />} />
            <Route path="/matchCheck" element={<MatchCheck />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/StudentPage" element={<StudentPage />} />
            <Route path="/TeacherPage" element={<TeacherPage />} />
            <Route path="/matchstatus" element={<MatchStatusPage />} />
            <Route path="/AttendanceStatus" element={<AttendanceStatusPage />} />
            <Route path="/TeacherAttendanceApproval" element={<TeacherAttendanceApproval />} />
            <Route path="/TeacherMatchedStudentsAttendancePage" element={<TeacherMatchedStudentsAttendancePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/schoollist" element={<SchoolList/>} /> 
            <Route path="/collegelist" element={<CollegeList />} />
            <Route path="/admin/memberManagement" element={<MemberManagement />} />
            <Route path="/matchinfo" element={<MatchInfo />} />
            <Route path="/admin/matches/:matchId" element={<MatchedInfoPage />} />
            <Route path="/AdminMatches" element={<AdminMatches />} />
            <Route path="/Practice/PracticeUpdate/:boardID" element={<PracticeUpdate />} />
            <Route path="/Practice/PracticeBoardDetail/:boardID" element={<PracticeBoardDetail />} />
            <Route path="/Class/ClassWrite" element={<ClassWrite />} />
            <Route path="/Class/ClassUpdate/:boardID" element={<ClassUpdate />} />
            <Route path="/Class/ClassBoardDetail/:boardID" element={<ClassBoardDetail />} />
            <Route path="/Union/UnionWrite" element={<UnionWrite />} />
            <Route path="/Union/UnionUpdate/:boardID" element={<UnionUpdate />} />
            <Route path="/Union/UnionBoardDetail/:boardID" element={<UnionBoardDetail />} />
            <Route path="/Operation/OperationWrite" element={<OperationWrite />} />
            <Route path="/Operation/OperationUpdate/:boardID" element={<OperationUpdate />} />
            <Route path="/Operation/OperationBoardDetail/:boardID" element={<OperationBoardDetail />} />
            <Route path='/FieldInternship' element={<FieldInternship />} />
            <Route path='/OperationModel' element={<OperationModel />} /> 
            <Route path='/FieldInternshipOverview' element={<FieldInternshipOverview />} />
            <Route path='/CentralSupport' element={<CentralSupport />} />
            <Route path='/CentralSupportProgram' element={<CentralSupportProgram />} />
            <Route path='/Listmgmt' element={<Listmgmt />} />
            <Route path='/Gallery' element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Class from './component/user/class/Class';
import Operation from './component/user/operation/Operation';
import Practice from './component/user/practice/Practice';
import Rating from './component/user/rating/Rating';
import RatingBoardDetail from './component/user/rating/RatingBoardDetail';
import RatingUpdate from './component/user/rating/RatingUpdate';
import RatingWrite from './component/user/rating/RatingWrite';
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
import FieldInternship from './component/main/FieldInternship';
import OperationModel from './component/main/OperationModel';
import FieldInternshipOverview from './component/main/FieldInternshipOverview';
import CentralSupport from './component/main/CentralSupport';
import CentralSupportProgram from './component/main/CentralSupportProgram';
import Reference from './component/manager/reference/Reference';
import ReferenceWrite from './component/manager/reference/ReferenceWrite';
import ReferenceBoardDetail from './component/manager/reference/ReferenceBoardDetail';
import ReferenceUpdate from './component/manager/reference/ReferenceUpdate';
import Form from './component/manager/form/Form';
import FormBoardDetail from './component/manager/form/FormBoardDetail';
import FormUpdate from './component/manager/form/FormUpdate';
import FormWrite from './component/manager/form/FormWrite';
import FAQ from './component/manager/faq/FAQ';
import FAQBoardDetail from './component/manager/faq/FAQBoardDetail';
import FAQUpdate from './component/manager/faq/FAQUpdate';
import FAQWrite from './component/manager/faq/FAQWrite';
import Notice from './component/manager/notice/Notice';
import NoticeBoardDetail from './component/manager/notice/NoticeBoardDetail';
import NoticeUpdate from './component/manager/notice/NoticeUpdate';
import NoticeWrite from './component/manager/notice/NoticeWrite';
import Listmgmt from './component/manager/listmanagement/Listmgmt';
import MainImage from './img/maru.jpg';
import Gallery from './component/manager/gallery/Gallery';
import GalleryWrite from './component/manager/gallery/GalleryWrite';
import GalleryDetail from './component/manager/gallery/GalleryDetail';
import GalleryEdit from './component/manager/gallery/GalleryEdit';
import CollegeList from './component/manager/listmanagement/CollegeList';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <div className="header-content">
          <Header />
        </div>
        <div className="mainImage">
          <img src={MainImage} alt="mainContent" className="main-image" />
        </div>
        <div className="main-content">
        <Routes>
            <Route path="/StudentPage" element={<StudentPage />} />
            <Route path="/TeacherPage" element={<TeacherPage />} />
            <Route path="/matchstatus" element={<MatchStatusPage />} />
            <Route path="/join/generaljoin" element={<GeneralJoin />} />
            <Route path="/join/institutionalJoin" element={<InstitutionalJoin />} />
            <Route path="/joinselect" element={<JoinSelect />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/findid" element={<FindID />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/AttendanceStatus" element={<AttendanceStatusPage />} />
            <Route path="/TeacherAttendanceApproval" element={<TeacherAttendanceApproval />} />
            <Route path="/TeacherMatchedStudentsAttendancePage" element={<TeacherMatchedStudentsAttendancePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/memberManagement" element={<MemberManagement />} />
            <Route path="/matchinfo" element={<MatchInfo />} />
            <Route path="/admin/matches/:matchId" element={<MatchedInfoPage />} />
            <Route path="/AdminMatches" element={<AdminMatches />} />
            <Route path="/Practice" element={<Practice/>} /> 
            <Route path="/Practice/PracticeWrite" element={<PracticeWrite/>} /> 
            <Route path="/Practice/PracticeUpdate/:boardID" element={<PracticeUpdate />} />
            <Route path="/Practice/PractcieBoardDetail/:boardID" element={<PracticeBoardDetail />} />
            <Route path="/Class" element={<Class/>} /> 
            <Route path="/Class/ClassWrite" element={<ClassWrite/>} /> 
            <Route path="/Class/ClassUpdate/:boardID" element={<ClassUpdate />} />
            <Route path="/Class/ClassBoardDetail/:boardID" element={<ClassBoardDetail />} />
            <Route path="/Union" element={<Union/>} /> 
            <Route path="/Union/UnionWrite" element={<UnionWrite/>} /> 
            <Route path="/Union/UnionUpdate/:boardID" element={<UnionUpdate />} />
            <Route path="/Union/UnionBoardDetail/:boardID" element={<UnionBoardDetail />} />
            <Route path="/Operation" element={<Operation />} />
            <Route path="/Operation/OperationWrite" element={<OperationWrite/>} /> 
            <Route path="/Operation/OperationUpdate/:boardID" element={<OperationUpdate />} />
            <Route path="/Operation/OperationBoardDetail/:boardID" element={<OperationBoardDetail />} /> 
            <Route path="/Rating" element={<Rating/>} /> 
            <Route path="/Rating/RatingWrite" element={<RatingWrite/>} /> 
            <Route path="/Rating/RatingUpdate/:boardID" element={<RatingUpdate />} />
            <Route path="/Rating/RatingBoardDetail/:boardID" element={<RatingBoardDetail />} />
            <Route path='/Reference' element={<Reference/>} />
            <Route path='/Reference/ReferenceWrite' element={<ReferenceWrite/>} />
            <Route path="/Reference/ReferenceUpdate/:boardID" element={<ReferenceUpdate />} />
            <Route path="/Reference/ReferenceBoardDetail/:boardID" element={<ReferenceBoardDetail />} />
            <Route path='/Form' element={<Form/>} />
            <Route path='/Form/FormWrite' element={<FormWrite/>} />
            <Route path="/Form/FormUpdate/:boardID" element={<FormUpdate />} />
            <Route path="/Form/FormBoardDetail/:boardID" element={<FormBoardDetail />} />
            <Route path='/FAQ' element={<FAQ/>} />
            <Route path='/FAQ/FAQWrite' element={<FAQWrite/>} />
            <Route path="/FAQ/FAQUpdate/:boardID" element={<FAQUpdate />} />
            <Route path="/FAQ/FAQBoardDetail/:boardID" element={<FAQBoardDetail />} /> 
            <Route path='/Notice' element={<Notice/>} />
            <Route path='/Notice/NoticeWrite' element={<NoticeWrite/>} />
            <Route path="/Notice/NoticeUpdate/:boardID" element={<NoticeUpdate />} />
            <Route path="/Notice/NoticeBoardDetail/:boardID" element={<NoticeBoardDetail />} />  
            <Route path='/FieldInternship' element={<FieldInternship />} />
            <Route path='/OperationModel' element={<OperationModel />} /> 
            <Route path='/FieldInternshipOverview' element={<FieldInternshipOverview />} />
            <Route path='/CentralSupport' element={<CentralSupport />} />
            <Route path='/CentralSupportProgram' element={<CentralSupportProgram />} />
            <Route path='/listmgmt' element={<Listmgmt />} />
            <Route path="/managerInfoModify" element={<ManagerInfoModify />} />
            <Route path="/matchCheck" element={<MatchCheck />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path='/managerInfo' element={<ManagerInfo />} />
            <Route path='/gallery/galleryWrite' element={<GalleryWrite />} />
            <Route path='/gallery/galleryDetail/:boardID' element={<GalleryDetail />} />
            <Route path='/gallery/galleryEdit/:boardID' element={<GalleryEdit />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/' element={<Main/>} />
            <Route path='/CollegeList' element={<CollegeList />} />
          </Routes>
        </div>
        <div className='footerMain'>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App; 
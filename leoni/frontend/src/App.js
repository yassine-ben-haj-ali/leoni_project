import "antd/dist/antd.css";
import Login from "./Pages/WithAll/Account/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fonctions from "./Pages/WithRole/Admin/Functions/UpdateDelete";
import AjoutFonction from "./Pages/WithRole/Admin/Functions/AjoutFunction";
import AjoutService from "./Pages/WithRole/Admin/Services/AjoutService";
import Services from "./Pages/WithRole/Admin/Services/Update_Service";
import AjoutSortie from "./Pages/WithRole/Admin/Sorties/AjoutSortie";
import Sorties from "./Pages/WithRole/Admin/Sorties/UpdateSortie";
import AjoutStage from "./Pages/WithRole/Admin/Stages/AjoutStage";
import Stages from "./Pages/WithRole/Admin/Stages/UpdateStage";
import AjoutUtilisateur from "./Pages/WithRole/Admin/Users/AjoutUser";
import Utilisateurs from "./Pages/WithRole/Admin/Users/UpdateUser";
import ChangePassword from "./Pages/WithAll/Account/ChangePassword";
import AjoutPersonel from "./Pages/WithAll/Autorisation/Personel";
import AjoutRebut from "./Pages/WithAll/Autorisation/Rebut";
import AjoutSociete from "./Pages/WithAll/Autorisation/Societe";
import AjoutMaterielles from "./Pages/WithAll/Autorisation/Materielles";
import ConfirmPersonel from "./Pages/WithRole/Admin/Confirmation/Personel";
import ConfirRebut from "./Pages/WithRole/Admin/Confirmation/Rebut";
import ConfirmSociete from "./Pages/WithRole/Admin/Confirmation/Societe";
import SocieteInfo from "./Pages/WithRole/Admin/Confirmation/SocieteInfo";
import RefusPersonel from "./Pages/WithRole/Admin/Refus/Personel";
import RefusRebut from "./Pages/WithRole/Admin/Refus/Rebut";
import RefusSociete from "./Pages/WithRole/Admin/Refus/Societe";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const{user}=useContext(AuthContext);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={user?<AjoutRebut/>:<Login/>} />
          <Route path="/gestion_users" element={user?<Utilisateurs/>:<Login/>}/>
          <Route path="/ajout_users" element={user?<AjoutUtilisateur />:<Login/>} />
          <Route path="/gestion_services" element={user?<Services />:<Login/>} />
          <Route path="/ajout_services" element={user?<AjoutService />:<Login/>} />
          <Route path="/gestion_fonctions" element={user?<Fonctions />:<Login/>} />
          <Route path="/ajout_fonctions" element={user?<AjoutFonction />:<Login/>} />
          <Route path="/gestion_typestage" element={user?<Stages />:<Login/>} />
          <Route path="/ajout_typestage" element={user?<AjoutStage />:<Login/>} />
          <Route path="/gestion_typesortie" element={user?<Sorties />:<Login/>} />
          <Route path="/ajout_typesortie" element={user?<AjoutSortie />:<Login/>} />
          <Route
            path="/autorisation_bienssociete"
            element={user?<AjoutSociete />:<Login/>}
          />
          <Route
            path="/autorisation_bienssociete/:id"
            element={user?<AjoutMaterielles />:<Login/>}
          />
          <Route
            path="/autorisation_info/:id"
            element={user?<SocieteInfo />:<Login/>}
          />
          <Route path="/autorisation_rebut" element={user?<AjoutRebut />:<Login/>} />
          <Route
            path="/autorisation_bienspersonel"
            element={user?<AjoutPersonel />:<Login/>}
          />
          <Route
            path="/confirm_autorisation_bienssociete"
            element={user?<ConfirmSociete />:<Login/>}
          />

          <Route
            path="/confirm_autorisation_rebut"
            element={user?<ConfirRebut />:<Login/>}
          />
          <Route
            path="/confirm_autorisation_bienspersonel"
            element={user?<ConfirmPersonel />:<Login/>}
          />
           <Route
            path="/refus_autorisation_rebut"
            element={user?<RefusRebut />:<Login/>}
          />
          <Route
            path="/refus_autorisation_bienssociete"
            element={user?<RefusSociete/>:<Login/>}
          />
          <Route
            path="/refus_autorisation_bienspersonel"
            element={user?<RefusPersonel />:<Login/>}
          />
          <Route path="/change_password" element={user?<ChangePassword />:<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

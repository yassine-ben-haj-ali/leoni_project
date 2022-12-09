import React, { useContext } from "react";
import { Layout, Menu, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const UserDashboard = ({ children }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const history = useNavigate();
  const { pathname } = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
      >
        <div className="logo" />
        <Menu
          style={{ marginTop: 60 }}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={pathname}
          activeKey={pathname}
        >
          {user.role === "Administrateur" && (
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span> gestion d'utilisateurs </span>
                </span>
              }
            >
              <Menu.Item key="/gestion_users">
                <span>supprimer et modifier utilisateur</span>
                <Link to="/gestion_users" />
              </Menu.Item>
              <Menu.Item key="/ajout_users">
                <span>ajouter utilisateur</span>
                <Link to="/ajout_users" />
              </Menu.Item>
            </SubMenu>
          )}
          {user.role === "Administrateur" && (
            <SubMenu
              key="sub2"
              title={
                <span>
                  <span> gestion fonction</span>
                </span>
              }
            >
              <Menu.Item key="/gestion_fonctions">
                <span>supprimer et modifier fonction</span>
                <Link to="/gestion_fonctions" />
              </Menu.Item>
              <Menu.Item key="/ajout_fonctions">
                <span>ajouter fonction</span>
                <Link to="/ajout_fonctions" />
              </Menu.Item>
            </SubMenu>
          )}
          {user.role === "Administrateur" && (
            <SubMenu
              key="sub3"
              title={
                <span>
                  <span> gestion services</span>
                </span>
              }
            >
              <Menu.Item key="/gestion-services">
                <span>modifier et supprimer services</span>
                <Link to="/gestion_services" />
              </Menu.Item>
              <Menu.Item key="/ajout-services">
                <span>ajouter service</span>
                <Link to="/ajout_services" />
              </Menu.Item>
            </SubMenu>
          )}

          {user.role === "Administrateur" &&<SubMenu
            key="sub4"
            title={
              <span>
                <span> gestion type de sortie</span>
              </span>
            }
          >
            <Menu.Item key="/gestion-typesortie">
              <span>supprimer/modifier type de sortie</span>
              <Link to="/gestion_typesortie" />
            </Menu.Item>
              <Menu.Item key="/ajout-typesortie">
                <span>ajouter type de sortie</span>
                <Link to="/ajout_typesortie" />
              </Menu.Item>
            
          </SubMenu>}
          {user.role === "Administrateur" &&<SubMenu
            key="sub5"
            title={
              <span>
                <span> gestion type de stage</span>
              </span>
            }
          >
            <Menu.Item key="/gestion_typestage">
              <span>supprimer/modifier type de stage</span>
              <Link to="/gestion_typestage" />
            </Menu.Item>
             
              <Menu.Item key="/ajout_typestage">
                <span>ajouter type de stage</span>
                <Link to="/ajout_typestage" />
              </Menu.Item>
            
          </SubMenu>}
          <SubMenu
            key="sub6"
            title={
              <span>
                <span> créer des autorisation </span>
              </span>
            }
          >
            <Menu.Item key="/autorisation_rebut">
              <span>rebut</span>
              <Link to="/autorisation_rebut" />
            </Menu.Item>
            <Menu.Item key="/autorisation_bienspersonel">
              <span>sortie biens personel</span>
              <Link to="/autorisation_bienspersonel" />
            </Menu.Item>
            <Menu.Item key="/autorisation_bienssociete">
              <span>sortie biens societe</span>
              <Link to="/autorisation_bienssociete" />
            </Menu.Item>
          </SubMenu>

          {user.role === "Administrateur" && (
            <SubMenu
              key="sub8"
              title={
                <span>
                  <span> accepter des autorisation </span>
                </span>
              }
            >
              <Menu.Item key="/confirm_autorisation_rbebut">
                <span>rebut</span>
                <Link to="/confirm_autorisation_rebut" />
              </Menu.Item>
              <Menu.Item key="/confirm_autorisation_bienspersonel">
                <span>sortie biens personel</span>
                <Link to="/confirm_autorisation_bienspersonel" />
              </Menu.Item>
              <Menu.Item key="/confirm_autorisation_bienssociete">
                <span>sortie biens societe</span>
                <Link to="/confirm_autorisation_bienssociete" />
              </Menu.Item>
            </SubMenu>
          )}
          {user.role === "Administrateur" && (
            <SubMenu
              key="sub9"
              title={
                <span>
                  <span> réfuser des autorisation </span>
                </span>
              }
            >
              <Menu.Item key="/refus_autorisation_rbebut">
                <span>rebut</span>
                <Link to="/refus_autorisation_rebut" />
              </Menu.Item>
              <Menu.Item key="/refus_autorisation_bienspersonel">
                <span>sortie biens personel</span>
                <Link to="/refus_autorisation_bienspersonel" />
              </Menu.Item>
              <Menu.Item key="/refus_autorisation_bienssociete">
                <span>sortie biens societe</span>
                <Link to="/refus_autorisation_bienssociete" />
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" style={{ width: "90px" }} />
          <Button
            style={{ marginRight: 20 }}
            onClick={() => {
              history("/change_password");
            }}
          >
            changer votre mot de passe
          </Button>
          <Button
            style={{ marginRight: 20 }}
            danger
            type="primary"
            onClick={logout}
          >
            déconnexion
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 580 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserDashboard;

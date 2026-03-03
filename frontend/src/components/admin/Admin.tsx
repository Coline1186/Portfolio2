import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { UserStar } from "lucide-react";
import SkillManagement from "./skill/SkillManagement";
import AboutManagement from "./about/AboutManagement";
import CvManagement from "./cv/CvManagement";
import ProjectManagement from "./project/ProjectManagement";
import { Button } from "../../ui/button";
import { Link, NavLink } from "react-router-dom";

function AdminPage() {
  return (
    <div className="pt-4">
      <div className="pb-4 flex gap-2 justify-center w-full border-b border-gray-300">
        <div className="flex items-center gap-3">
          <UserStar className="h-8 w-8 md:h-9 md:w-9 text-primary md:translate-y-1" />
          <h1>Page Admin</h1>
        </div>
      </div>
      <Button className="mx-4 my-2">
        <NavLink to="/">Portfolio</NavLink>
      </Button>
      <div className="my-8 mx-4">
        <Tabs defaultValue="skills" className="w-full h-full border rounded-lg">
          <TabsList className="flex flex-col sm:flex-row w-full bg-muted">
            <TabsTrigger
              value="skills"
              className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
            >
              Gestion des Skills
            </TabsTrigger>
            <TabsTrigger
              value="abouts"
              className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
            >
              Gestion des photos
            </TabsTrigger>
            <TabsTrigger
              value="cv"
              className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
            >
              Ajouter mon CV
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
            >
              Ajouter un projet
            </TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <SkillManagement />
          </TabsContent>
          <TabsContent value="abouts">
            <AboutManagement />
          </TabsContent>
          <TabsContent value="cv">
            <CvManagement />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectManagement />
          </TabsContent>
        </Tabs>

        <Link
          to="/auth/logout"
          className="text-left block px-4 py-2 text-xs text-primary hover:text-hover"
        >
          Se déconnecter
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { UserStar } from "lucide-react"
import SkillManagement from "./skill/SkillManagement"

function AdminPage() {
   return (
      <div className="pt-4">
         <div className="pb-4 flex gap-2 justify-center w-full border-b border-gray-300">
            <div className="flex items-center gap-3">
               <UserStar className="h-8 w-8 md:h-9 md:w-9 text-primary md:translate-y-1" />
               <h1>Page Admin</h1>
            </div>
         </div>
         <div className="my-8 mx-4">
            <Tabs
               defaultValue="books"
               className="w-full h-full border rounded-lg"
            >
               <TabsList className="flex flex-col sm:flex-row w-full bg-muted">
                  <TabsTrigger
                     value="books"
                     className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
                  >
                     Gestion des Compétences
                  </TabsTrigger>
                  <TabsTrigger
                     value="categories"
                     className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
                  >
                     Gestion des catégories
                  </TabsTrigger>
                  <TabsTrigger
                     value="users"
                     className="w-full sm:w-auto text-sm sm:text-base data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground"
                  >
                     Gestion des utilisateurs
                  </TabsTrigger>
               </TabsList>
               <TabsContent value="books">
                  <SkillManagement />
               </TabsContent>
               <TabsContent value="categories">
                  {/* <CategoryManagement /> */}
               </TabsContent>
               <TabsContent value="users">
                  {/* <UserManagement /> */}
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

export default AdminPage

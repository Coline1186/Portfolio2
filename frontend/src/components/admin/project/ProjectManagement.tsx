import { CategoryQuery } from "@/generated/graphql"
import { GET_CATEGORIES_POPULARITY } from "@/requetes/queries/categories.requests"
import { useQuery } from "@apollo/client"
import {
   Table,
   TableBody,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"

import CategoryRow from "./ProjectRow"
import AddCategory from "./AddProject"
import { useState } from "react"

function ProjectManagement() {
   const { data, refetch } = useQuery<CategoryQuery>(GET_CATEGORIES_POPULARITY)
   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

   return (
      <div className="flex flex-col px-4 py-3">
         <div className="mt-4 md:mt-0">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-primary inline-block pb-1 mb-6">
               Catégories existantes
            </h2>
         </div>

         <div className="border rounded-md overflow-x-auto">
            <div className="max-h-[400px] overflow-y-auto">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="text-left w-[250px] pr-1">
                           Nom
                        </TableHead>
                        <TableHead className="text-left w-[100px] pr-1">
                           Livres
                        </TableHead>
                        <TableHead className="text-left w-[150px] pr-1">
                           Mise à jour
                        </TableHead>
                        <TableHead className="text-left w-[150px] pr-1">
                           Actions
                        </TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {data?.countBooksByCategory?.map((el) => {
                        return (
                           el && (
                              <CategoryRow
                                 key={el?.category?.id}
                                 cat={el}
                                 selectedCategory={selectedCategory}
                                 setSelectedCategory={setSelectedCategory}
                                 refetch={refetch}
                              />
                           )
                        )
                     })}
                  </TableBody>
               </Table>
            </div>
         </div>

         <div className="mt-4">
            <AddCategory refetch={refetch} />
         </div>
      </div>
   )
}

export default ProjectManagement

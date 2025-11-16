// import { uuid } from "@tanstack/react-form";
// import { ListRow } from "../../../components/Atoms/Row/ListRow";
// import { ListContainer } from "../../../components/Molecules/List/ListContainer";
// import {
//   courseFormOpts,
//   useFormContext,
//   withForm,
// } from "../../../form/formKit";
// import { AsideComponent } from "../../../Layouts/Aside/AsideComponent";
// import { ludoNavigation } from "../../../routes/ludoNavigation";
// import { router } from "../../../routes/router";
// import { OrderSelector } from "../UI/OrderSelector";
// import { SelectionSideTab } from "../UI/SelectionSideTab";

// export const ModuleForm = withForm({
//   ...courseFormOpts,
//   props: {
//     moduleId: "" as string,
//     courseId: "" as string,
//   },
//   render: ({ form, moduleId, courseId }) => {
//     console.log("FSV: " + JSON.stringify(form.state.values.modules));
//     return (
//       <form.Field name="modules" mode="array">
//         {(fa) => (
//           <AsideComponent customSpan="col-start-1 col-end-4" orientation="LEFT">
//             <div className="flex flex-col py-6">
//               <ListContainer title="Modules">
//                 {fa.state.value.map((m, index) => {
//                   console.log(m);
//                   if (!m) return null;
//                   const thisId = m.moduleId;

//                   const handleDelete = (e?: React.MouseEvent) => {
//                     e?.preventDefault?.();
//                     e?.stopPropagation?.();

//                     const mods = fa.state.value;
//                     const thisId = m.moduleId;
//                     const isCurrent = moduleId === thisId;

//                     const nextId =
//                       mods[index + 1]?.moduleId ?? mods[index - 1]?.moduleId;

//                     if (isCurrent) {
//                       router.navigate(
//                         nextId
//                           ? ludoNavigation.build.toBuilderModule(
//                               courseId,
//                               nextId
//                             )
//                           : ludoNavigation.build.toSelectCourse()
//                       );
//                     }

//                     queueMicrotask(() => fa.removeValue(index));
//                   };

//                   return (
//                     <form.AppField key={thisId} name={`modules[${index}]`}>
//                       {() => (
//                         <ListRow
//                           hover={false}
//                           py="py-0"
//                           px="px-0"
//                           alignment="start"
//                           active={moduleId === thisId}
//                         >
//                           <div className="w-full flex gap-2 flex-col p-4">
//                             <form.AppField name={`modules[${index}].title`}>
//                               {(f) => (
//                                 <f.TitleField
//                                   arrayLength={fa.state.value.length}
//                                   deletable
//                                   onDelete={handleDelete}
//                                 />
//                               )}
//                             </form.AppField>

//                             <OrderSelector
//                               index={index}
//                               count={fa.state.value.length}
//                               onChange={(newIndex) =>
//                                 fa.moveValue(index, newIndex)
//                               }
//                               className="border-ludoLightPurple hover:cursor-pointer border-2 rounded-md w-20"
//                             />
//                           </div>

//                           <SelectionSideTab
//                             active={moduleId === thisId}
//                             onClick={() =>
//                               router.navigate(
//                                 ludoNavigation.build.toBuilder(
//                                   courseId,
//                                   thisId!!
//                                 )
//                               )
//                             }
//                           />
//                         </ListRow>
//                       )}
//                     </form.AppField>
//                   );
//                 })}

//                 <ListRow
//                   alignment="center"
//                   fill
//                   py="py-2"
//                   onClick={() =>
//                     fa.pushValue({
//                       moduleId: uuid(),
//                       title: "",
//                       lessons: [],
//                     })
//                   }
//                 >
//                   <p className="text-center text-xl font-bold">+</p>
//                 </ListRow>
//               </ListContainer>
//             </div>
//           </AsideComponent>
//         )}
//       </form.Field>
//     );
//   },
// });

import { ProgramService } from '@services/program.service';
import catchAsync from '@utils/catchAsync';

export const getProgramsPage = catchAsync(async (req, res, next) => {
    const programs =  await ProgramService.getPrograms()
    console.log(programs)
    res.render("programs", {
        programs
    })
})


export const createProgramPage = catchAsync(async (req, res, next) => {
    res.render("edit-program", {
        mode: 'create',
        program: {}
    })
})

export const editProgramPage = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const program = await ProgramService.getProgramById(Number(id))

    if (!program) {
        return res.redirect("/admin/programs")
    }

    res.render("edit-program", {
        mode: 'edit',
        id,
        program
    })
})

export const createProgram = catchAsync(async (req, res, next) => {
    await ProgramService.createProgram(req.body)
    res.redirect('/admin/programs')
})

export const deleteProgram = catchAsync(async (req, res, next) => {
    const id = req.params.id

    const program = await ProgramService.getProgramById(Number(id))

    if (!program) {
        return res.redirect("/admin/programs")
    }    
    
    await ProgramService.deleteProgram(Number(id))

    res.redirect('/admin/programs')
})

export const updateProgram = catchAsync(async (req, res, next) => {
    const id = req.params.id

    const program = await ProgramService.getProgramById(Number(id))

    if (!program) {
        return res.redirect("/admin/programs")
    }    

    await ProgramService.updateProgram(Number(id), req.body)

    res.redirect('/admin/programs')
})
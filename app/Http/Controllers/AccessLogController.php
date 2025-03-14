<?php

namespace App\Http\Controllers;

use App\Models\AccessLog;
use App\Repositories\FilterRepository;
use Inertia\Inertia;

class AccessLogController extends Controller
{
    public function __construct(protected FilterRepository $filterRepository) {}

    public function index()
    {
        $access_logs = AccessLog::query();
        $this->filterRepository->searchAccessLogs($access_logs, request('searchQuery'));
        $access_logs = $access_logs->latest()->paginate(10);

        return Inertia::render('access-log/index', [
            'access_logs' => $access_logs,
        ]);
    }

    public function store()
    {
        if (request('user_id') == auth()->id()) {
            AccessLog::firstOrCreate(request()->all());
        }
    }
}

<div>
    <div style="text-align: left">
        <div style="text-align: end">
            @if (session()->has('message'))
                <div class="text-green-500">
                    {{ session('message') }}
                </div>
            @endif
            <button wire:click="new">New</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Description</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                @if ($subs)
                    @foreach ($subs as $sub)
                        <tr>
                            <td>{{ $sub['display_name'] }}</td>
                            <td>{{ $sub['subscribers'] }}</td>
                            <td>{{ $sub['public_description'] }}</td>
                            <td>{{ $sub['created'] }}</td>
                        </tr>
                    @endforeach
                @endif
                @foreach ($subreddits as $sub)
                    <tr>
                        <td>{{ $sub->name }}</td>
                        <td>{{ $sub->size }}</td>
                        <td>{{ $sub->desc }}</td>
                        <td>{{ $sub->created }}</td>
                    </tr>
                @endforeach
                {{ $subreddits->links() }}
            </tbody>
        </table>
    </div>
</div>
